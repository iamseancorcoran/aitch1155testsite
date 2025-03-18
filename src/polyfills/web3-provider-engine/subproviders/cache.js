// Mock implementation of the cache subprovider
// This is a stub to prevent runtime errors

export default class CacheSubprovider {
  constructor(opts = {}) {
    this.cache = {};
  }

  // Basic methods to prevent errors
  getCacheWifeHash() { return null; }
  getWifeHash() { return null; }
  setWifeHash() {}
  clearCache() {}

  // Handle the provider interface
  handleRequest(payload, next, end) {
    // Just pass through to the next provider
    next();
  }
}

// Also provide a named export
export const Cache = CacheSubprovider;
