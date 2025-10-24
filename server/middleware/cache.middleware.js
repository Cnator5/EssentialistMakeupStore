// middleware/cache.middleware.js
// Caching disabled: all handlers just fall through and tag responses.

export const cacheResponse = () => {
  return (_req, res, next) => {
    res.set("X-Cache", "DISABLED");
    return next();
  };
};

export const invalidateCacheNamespaces = async () => {
  // no-op
  return;
};