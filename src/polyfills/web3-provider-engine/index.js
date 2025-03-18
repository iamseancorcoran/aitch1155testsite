// Mock implementation of web3-provider-engine
// This simulates the module for browser compatibility

// Main class export
export default class Web3ProviderEngine {
  constructor(options = {}) {
    this.options = options;
    this.providers = [];
  }

  // Basic provider methods to prevent errors
  addProvider() {}
  start() {}
  stop() {}
  enable() { return Promise.resolve(true); }
  send() { return {}; }
  sendAsync(payload, callback) {
    // Simulate an empty response after a delay
    setTimeout(() => {
      callback(null, { id: payload.id, jsonrpc: '2.0', result: {} });
    }, 10);
  }
}

// Also export commonly used classes/functions
export class Provider {}
export class FixtureProvider {}
export class Web3Provider {}
export const createProvider = () => ({});
