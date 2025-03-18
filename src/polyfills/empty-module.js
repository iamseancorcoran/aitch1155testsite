// Empty module replacement for web3-provider-engine
// This is used to handle CommonJS require() issues in the browser

// Export an empty object to prevent errors
export default {};

// Also provide named exports that might be used
export const Provider = class MockProvider {};
export const FixtureProvider = class MockFixtureProvider {};
export const Web3Provider = class MockWeb3Provider {};
export const createProvider = () => ({});
