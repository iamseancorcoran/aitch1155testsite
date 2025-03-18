// Polyfills for Node.js globals in the browser environment
import { Buffer } from 'buffer';

// Import Web3 provider engine mocks
import Web3ProviderEngine, { Provider, FixtureProvider, Web3Provider } from './polyfills/web3-provider-engine';
import CacheSubprovider from './polyfills/web3-provider-engine/subproviders/cache';
import FixtureSubprovider from './polyfills/web3-provider-engine/subproviders/fixture';
import NonceTrackerSubprovider from './polyfills/web3-provider-engine/subproviders/nonce-tracker';
import FiltersSubprovider from './polyfills/web3-provider-engine/subproviders/filters';
import HookedWalletSubprovider from './polyfills/web3-provider-engine/subproviders/hooked-wallet';
import SubscriptionsSubprovider from './polyfills/web3-provider-engine/subproviders/subscriptions';

// Import browser-compatible modules for Node.js core modules
import streamBrowserify from 'stream-browserify';
import streamHttp from 'stream-http';
import httpsBrowserify from 'https-browserify';
import osBrowserify from 'os-browserify/browser';
import cryptoBrowserify from 'crypto-browserify';
import assert from 'assert';

// Global object polyfill
(window as any).global = window;

// Process polyfill
(window as any).process = (window as any).process || {};
(window as any).process.env = (window as any).process.env || {};
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = { node: '' };

// Buffer polyfill
(window as any).Buffer = Buffer;

// Create a mapping of CommonJS modules to their browser versions
const moduleMap: Record<string, any> = {
  // Web3 provider engine and its submodules
  'web3-provider-engine': Web3ProviderEngine,
  'web3-provider-engine/subproviders/cache': CacheSubprovider,
  'web3-provider-engine/subproviders/fixture': FixtureSubprovider,
  'web3-provider-engine/subproviders/nonce-tracker': NonceTrackerSubprovider,
  'web3-provider-engine/subproviders/filters': FiltersSubprovider,
  'web3-provider-engine/subproviders/hooked-wallet': HookedWalletSubprovider,
  'web3-provider-engine/subproviders/subscriptions': SubscriptionsSubprovider,
  
  // Node.js core modules polyfilled for the browser
  'stream': streamBrowserify,
  'http': streamHttp,
  'https': httpsBrowserify,
  'os': osBrowserify,
  'crypto': cryptoBrowserify,
  'assert': assert,
};

// Add special exports to the web3-provider-engine module
moduleMap['web3-provider-engine'].Provider = Provider;
moduleMap['web3-provider-engine'].FixtureProvider = FixtureProvider;
moduleMap['web3-provider-engine'].Web3Provider = Web3Provider;

// Define a custom require function for CommonJS compatibility
if (typeof window !== 'undefined' && !(window as any).require) {
  (window as any).require = function(module: string) {
    // Check if the module is in our map
    if (moduleMap[module]) {
      return moduleMap[module];
    }
    
    // For subpaths like 'web3-provider-engine/submodule' that aren't explicitly mapped
    const mainModule = module.split('/')[0];
    if (moduleMap[mainModule]) {
      console.warn(`Partial module path match for "${module}". Using main module "${mainModule}".`);
      return moduleMap[mainModule];
    }
    
    console.warn(`Module "${module}" was requested via require() but not found in the module map.`);
    // Return an empty object instead of throwing to prevent breaks
    return {};
  };
}
