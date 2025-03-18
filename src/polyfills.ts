// Polyfills for Node.js globals in the browser environment

// Global object polyfill
(window as any).global = window;

// Process polyfill
(window as any).process = (window as any).process || {};
(window as any).process.env = (window as any).process.env || {};
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = { node: '' };

// Buffer polyfill
import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;
