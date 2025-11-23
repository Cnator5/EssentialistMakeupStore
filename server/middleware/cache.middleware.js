// middleware/cache.middleware.js
import crypto from 'crypto';
import redisClient, { isRedisAvailable } from '../config/redisClient.js';

const DEFAULT_TTL_SECONDS = 120;
const INDEX_PREFIX = 'cache:index';
const KEY_PREFIX = 'cache:item';

const normalizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = normalizeValue(value[key]);
        return acc;
      }, {});
  }

  return value;
};

const buildCacheKey = (namespace, req) => {
  const method = req.method.toUpperCase();
  const baseUrl = req.baseUrl || '';
  const path = req.path || req.originalUrl || '';
  const query = normalizeValue(req.query || {});
  const body = method === 'GET' ? undefined : normalizeValue(req.body || {});
  const fingerprint = JSON.stringify({ method, baseUrl, path, query, body });
  const hash = crypto.createHash('sha256').update(fingerprint).digest('hex');
  return `${KEY_PREFIX}:${namespace}:${hash}`;
};

const namespaceIndexKey = (namespace) => `${INDEX_PREFIX}:${namespace}`;

const registerCacheKey = async (namespace, cacheKey, ttlSeconds) => {
  try {
    const indexKey = namespaceIndexKey(namespace);
    await redisClient.sadd(indexKey, cacheKey);
    const indexTtl = Math.max(ttlSeconds * 2, 600);
    await redisClient.expire(indexKey, indexTtl);
  } catch (error) {
    console.error(`[cache] Failed to register cache key for namespace "${namespace}":`, error);
  }
};

const shouldBypassCache = (req) => {
  if (!isRedisAvailable) return 'DISABLED';
  if (!['GET', 'POST'].includes(req.method.toUpperCase())) return 'METHOD';
  if (req.headers['cache-control']?.includes('no-store')) return 'REQ_NO_STORE';
  if (req.headers['pragma']?.includes('no-cache')) return 'REQ_NO_CACHE';
  if (req.user) return 'AUTH_USER';
  if (req.headers.authorization) return 'AUTH_HEADER';
  return null;
};

export const cacheResponse = ({
  namespace,
  ttlSeconds = DEFAULT_TTL_SECONDS,
} = {}) => {
  if (!namespace) {
    throw new Error('cacheResponse middleware requires a "namespace" option.');
  }

  return async (req, res, next) => {
    const skipReason = shouldBypassCache(req);
    if (skipReason) {
      res.set('X-Cache', `SKIP-${skipReason}`);
      return next();
    }

    if (ttlSeconds <= 0) {
      res.set('X-Cache', 'SKIP-TTL');
      return next();
    }

    const cacheKey = buildCacheKey(namespace, req);

    try {
      const cachedPayload = await redisClient.get(cacheKey);
      if (cachedPayload) {
        res.set('X-Cache', 'HIT');
        const parsed = JSON.parse(cachedPayload);
        return res.json(parsed);
      }
    } catch (error) {
      console.error(`[cache] Failed to read cache key "${cacheKey}":`, error);
    }

    res.set('X-Cache', 'MISS');

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      const result = originalJson(body);

      const statusOk = res.statusCode >= 200 && res.statusCode < 300;
      const explicitError = body && (body.error === true || body.success === false);

      if (!statusOk || explicitError) {
        return result;
      }

      try {
        const payload = JSON.stringify(body);
        redisClient
          .set(cacheKey, payload, { ex: ttlSeconds })
          .then(() => registerCacheKey(namespace, cacheKey, ttlSeconds))
          .catch((error) => {
            console.error(`[cache] Failed to store cache key "${cacheKey}":`, error);
          });
      } catch (error) {
        console.error(`[cache] Failed to serialize response for key "${cacheKey}":`, error);
      }

      return result;
    };

    return next();
  };
};

export const invalidateCacheNamespaces = async (namespaces = []) => {
  if (!isRedisAvailable) return;

  const list = Array.isArray(namespaces) ? namespaces : [namespaces];
  const uniqueNamespaces = [...new Set(list.filter(Boolean))];

  await Promise.all(
    uniqueNamespaces.map(async (namespace) => {
      const indexKey = namespaceIndexKey(namespace);

      try {
        const members = await redisClient.smembers(indexKey);
        if (members?.length) {
          await redisClient.del(...members);
        }
        await redisClient.del(indexKey);
      } catch (error) {
        console.error(`[cache] Failed to invalidate namespace "${namespace}":`, error);
      }
    })
  );
};