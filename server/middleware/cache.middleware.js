import crypto from "crypto";
import redisClient, { ensureRedisConnection } from "../config/redisClient.js";

const DEFAULT_TTL_SECONDS = 60;

const toArray = (value) => (Array.isArray(value) ? value : [value]);

const normalizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = normalizeValue(value[key]);
        return acc;
      }, {});
  }

  return value;
};

const createFingerprint = (req) => {
  const payload = {
    method: req.method,
    query: normalizeValue(req.query || {}),
    body: ["GET", "HEAD"].includes(req.method) ? undefined : normalizeValue(req.body || {})
  };

  const json = JSON.stringify(payload);
  return crypto.createHash("sha1").update(json).digest("hex");
};

const getUserSegment = (req, varyByUser) => {
  if (!varyByUser) return "public";
  const userId = req.user?._id;
  if (!userId) return "anon";
  return typeof userId === "string" ? userId : userId.toString();
};

const sanitizeNamespace = (namespace) =>
  namespace
    .replace(/^cache:/, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9:_-]/g, "_");

const defaultNamespaceFactory = (req) => {
  const base = req.baseUrl || "";
  const path = req.path || req.originalUrl || "";
  return `${req.method}:${base}${path}`;
};

export const cacheResponse = (options = {}) => {
  const resolvedOptions =
    typeof options === "number"
      ? { ttlSeconds: options }
      : { ttlSeconds: DEFAULT_TTL_SECONDS, ...options };

  const {
    ttlSeconds = DEFAULT_TTL_SECONDS,
    namespace,
    varyByUser = false,
    skip = () => false
  } = resolvedOptions;

  return async (req, res, next) => {
    if (skip(req)) {
      res.set("X-Cache", "SKIP");
      return next();
    }

    const effectiveNamespace = sanitizeNamespace(
      namespace || defaultNamespaceFactory(req)
    );
    const cacheNamespaceKey = `cache:${effectiveNamespace}`;
    res.locals.cacheNamespace = cacheNamespaceKey;

    let redis;
    try {
      redis = await ensureRedisConnection();
    } catch (error) {
      console.error("Redis connection failed, bypassing cache:", error);
      res.set("X-Cache", "BYPASS");
      return next();
    }

    const fingerprint = createFingerprint(req);
    const userSegment = getUserSegment(req, varyByUser);
    const redisKey = `${cacheNamespaceKey}:${userSegment}:${fingerprint}`;

    try {
      const cachedValue = await redis.get(redisKey);
      if (cachedValue) {
        res.set("X-Cache", "HIT");
        return res.json(JSON.parse(cachedValue));
      }

      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        const statusCode = res.statusCode;
        const success = statusCode >= 200 && statusCode < 300;

        if (success) {
          try {
            const payload = JSON.stringify(body);
            await redis.setEx(redisKey, ttlSeconds, payload);
            res.set("X-Cache", "MISS");
          } catch (cacheError) {
            console.error("Failed to write to Redis cache:", cacheError);
            res.set("X-Cache", "STORE_ERROR");
          }
        } else {
          res.set("X-Cache", "SKIP");
        }

        return originalJson(body);
      };

      return next();
    } catch (error) {
      console.error("Cache middleware error:", error);
      res.set("X-Cache", "BYPASS");
      return next();
    }
  };
};

const chunkArray = (array, size = 500) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const invalidateCacheNamespaces = async (namespaces = []) => {
  const namespaceList = toArray(namespaces).filter(Boolean);

  if (!namespaceList.length) return;

  let redis;
  try {
    redis = await ensureRedisConnection();
  } catch (error) {
    console.error("Redis connection failed during invalidation:", error);
    return;
  }

  for (const namespace of namespaceList) {
    const sanitizedNamespace = sanitizeNamespace(namespace);
    const pattern = `cache:${sanitizedNamespace}:*`;
    const keys = [];

    try {
      for await (const key of redis.scanIterator({
        MATCH: pattern,
        COUNT: 1000
      })) {
        keys.push(key);
      }

      if (!keys.length) continue;

      const chunks = chunkArray(keys, 500);
      for (const chunk of chunks) {
        await redis.del(...chunk);
      }
    } catch (error) {
      console.error(`Failed to invalidate cache namespace "${namespace}":`, error);
    }
  }
};