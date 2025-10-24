// config/redisClient.js
// Redis disabled: lightweight stub to keep the rest of the app running.

export const ensureRedisConnection = async () => null;

const redisClient = {
  isOpen: false,
  connect: async () => null,
  disconnect: async () => null,
  get: async () => null,
  setEx: async () => null,
  del: async () => null,
  scanIterator: async function* () {},
  on: () => null
};

export default redisClient;