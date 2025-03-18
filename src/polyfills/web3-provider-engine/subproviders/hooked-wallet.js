// Mock implementation of the hooked-wallet subprovider
// This is a stub to prevent runtime errors

export default class HookedWalletSubprovider {
  constructor(options = {}) {
    this.options = options;
    this.accounts = [];
  }

  // Basic wallet methods to prevent errors
  getAccounts() { return Promise.resolve([]); }
  signTransaction() { return Promise.resolve('0x0'); }
  signMessage() { return Promise.resolve('0x0'); }
  signPersonalMessage() { return Promise.resolve('0x0'); }
  signTypedMessage() { return Promise.resolve('0x0'); }

  // Handle the provider interface
  handleRequest(payload, next, end) {
    // Just pass through to the next provider
    next();
  }
}

// Also provide a named export
export const HookedWallet = HookedWalletSubprovider;
