// // config/redisClient.js
// import { Redis } from '@upstash/redis';

// const missingEnvVars = [];
// if (!process.env.UPSTASH_REDIS_REST_URL) missingEnvVars.push('UPSTASH_REDIS_REST_URL');
// if (!process.env.UPSTASH_REDIS_REST_TOKEN) missingEnvVars.push('UPSTASH_REDIS_REST_TOKEN');

// const createDisabledClient = (reason) => ({
//   isReady: false,
//   reason,
//   async get() { return null; },
//   async set() { return null; },
//   async del() { return null; },
//   async sadd() { return null; },
//   async expire() { return null; },
//   async smembers() { return []; },
//   async ping() { return 'PONG'; },
// });

// let redisClient = createDisabledClient();
// let isRedisEnabled = false;
// let initializationError = null;

// if (missingEnvVars.length === 0) {
//   try {
//     redisClient = new Redis({
//       url: process.env.UPSTASH_REDIS_REST_URL,
//       token: process.env.UPSTASH_REDIS_REST_TOKEN,
//     });
//     redisClient.isReady = true;
//     isRedisEnabled = true;
//   } catch (error) {
//     initializationError = error;
//     redisClient = createDisabledClient(error);
//     console.error('[redis] Failed to initialize Upstash Redis client:', error);
//   }
// } else {
//     initializationError = new Error(`Missing env vars: ${missingEnvVars.join(', ')}`);
//     console.warn('[redis] Upstash Redis disabled – missing env vars:', missingEnvVars);
// }

// let hasPinged = false;

// export const ensureRedisConnection = async () => {
//   if (!isRedisEnabled) {
//     return {
//       ok: false,
//       reason: initializationError?.message ?? 'Redis disabled',
//     };
//   }

//   if (hasPinged) {
//     return { ok: true, pong: 'PONG' };
//   }

//   try {
//     const pong = await redisClient.ping();
//     hasPinged = true;
//     console.log('[redis] Upstash Redis connection OK:', pong);
//     return { ok: true, pong };
//   } catch (error) {
//     console.error('[redis] Upstash Redis ping failed:', error);
//     return { ok: false, error };
//   }
// };

// export const isRedisAvailable = isRedisEnabled;
// export const redisInitializationError = initializationError;

// export default redisClient;



import { Redis } from '@upstash/redis';

const REQUIRED_ENV_VARS = ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'];
const missingEnvVars = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

const createDisabledClient = (reason = 'Redis disabled') => ({
  isReady: false,
  reason,
  async get() {
    return null;
  },
  async set() {
    return null;
  },
  async del() {
    return null;
  },
  async sadd() {
    return null;
  },
  async expire() {
    return null;
  },
  async smembers() {
    return [];
  },
  async ping() {
    return 'PONG';
  },
});

const globalStateKey = Symbol.for('esmakeup.redis');
const globalState =
  globalThis[globalStateKey] ||
  {
    client: createDisabledClient(),
    isEnabled: false,
    initializationError: null,
    hasPinged: false,
    lastHealthCheck: 0,
    initialized: false,
  };

if (!globalThis[globalStateKey]) {
  globalThis[globalStateKey] = globalState;
}

let redisClient = globalState.client;
let isRedisEnabled = globalState.isEnabled;
let initializationError = globalState.initializationError;
let hasPinged = globalState.hasPinged;
let lastHealthCheck = globalState.lastHealthCheck;

if (!globalState.initialized) {
  if (missingEnvVars.length === 0) {
    try {
      redisClient = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      redisClient.isReady = true;
      isRedisEnabled = true;
      initializationError = null;
    } catch (error) {
      initializationError = error;
      redisClient = createDisabledClient(error?.message ?? 'Redis init failed');
      console.error('[redis] Failed to initialize Upstash Redis client:', error);
    }
  } else {
    initializationError = new Error(`Missing env vars: ${missingEnvVars.join(', ')}`);
    redisClient = createDisabledClient(initializationError.message);
    console.warn('[redis] Upstash Redis disabled – missing env vars:', missingEnvVars);
  }

  globalState.client = redisClient;
  globalState.isEnabled = isRedisEnabled;
  globalState.initializationError = initializationError;
  globalState.initialized = true;
}

const HEALTHCHECK_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

export const ensureRedisConnection = async ({ force = false } = {}) => {
  if (!isRedisEnabled) {
    return {
      ok: false,
      reason: initializationError?.message ?? 'Redis disabled',
    };
  }

  const now = Date.now();
  if (!force && hasPinged && now - lastHealthCheck < HEALTHCHECK_COOLDOWN_MS) {
    return { ok: true, pong: 'CACHED' };
  }

  try {
    const pong = await redisClient.ping();
    hasPinged = true;
    lastHealthCheck = now;

    globalState.hasPinged = hasPinged;
    globalState.lastHealthCheck = lastHealthCheck;

    if (!globalState.isEnabled) {
      globalState.isEnabled = true;
    }

    return { ok: true, pong };
  } catch (error) {
    initializationError = error;
    globalState.initializationError = error;
    globalState.isEnabled = false;
    console.error('[redis] Upstash Redis ping failed:', error);

    return { ok: false, error };
  }
};

export const isRedisAvailable = isRedisEnabled;
export const redisInitializationError = initializationError;

export default redisClient;