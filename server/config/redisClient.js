// config/redisClient.js
import { Redis } from '@upstash/redis';

const missingEnvVars = [];
if (!process.env.UPSTASH_REDIS_REST_URL) missingEnvVars.push('UPSTASH_REDIS_REST_URL');
if (!process.env.UPSTASH_REDIS_REST_TOKEN) missingEnvVars.push('UPSTASH_REDIS_REST_TOKEN');

const createDisabledClient = (reason) => ({
  isReady: false,
  reason,
  async get() { return null; },
  async set() { return null; },
  async del() { return null; },
  async sadd() { return null; },
  async expire() { return null; },
  async smembers() { return []; },
  async ping() { return 'PONG'; },
});

let redisClient = createDisabledClient();
let isRedisEnabled = false;
let initializationError = null;

if (missingEnvVars.length === 0) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    redisClient.isReady = true;
    isRedisEnabled = true;
  } catch (error) {
    initializationError = error;
    redisClient = createDisabledClient(error);
    console.error('[redis] Failed to initialize Upstash Redis client:', error);
  }
} else {
    initializationError = new Error(`Missing env vars: ${missingEnvVars.join(', ')}`);
    console.warn('[redis] Upstash Redis disabled – missing env vars:', missingEnvVars);
}

let hasPinged = false;

export const ensureRedisConnection = async () => {
  if (!isRedisEnabled) {
    return {
      ok: false,
      reason: initializationError?.message ?? 'Redis disabled',
    };
  }

  if (hasPinged) {
    return { ok: true, pong: 'PONG' };
  }

  try {
    const pong = await redisClient.ping();
    hasPinged = true;
    console.log('[redis] Upstash Redis connection OK:', pong);
    return { ok: true, pong };
  } catch (error) {
    console.error('[redis] Upstash Redis ping failed:', error);
    return { ok: false, error };
  }
};

export const isRedisAvailable = isRedisEnabled;
export const redisInitializationError = initializationError;

export default redisClient;