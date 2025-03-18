// Mock implementation of the nonce-tracker subprovider
// This is a stub to prevent runtime errors

export default class NonceTrackerSubprovider {
  constructor(opts = {}) {
    this.nonceCache = {};
  }

  // Basic methods to prevent errors
  getNonceLock() { 
    return Promise.resolve({
      nextNonce: 0,
      releaseLock: () => {}
    });
  }

  // Handle the provider interface
  handleRequest(payload, next, end) {
    // Just pass through to the next provider
    next();
  }
}

// Also provide a named export
export const NonceTracker = NonceTrackerSubprovider;
