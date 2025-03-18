import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use relative paths for assets
  base: './',
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
      include: [
        'buffer', 
        'process', 
        'util', 
        'stream', 
        'events', 
        'http', 
        'https', 
        'crypto',
        'path',
        'os',
        'assert',
        'fs',
        'url',
      ],
      globals: {
        Buffer: true,
        global: true,
        process: true
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Manually handle CommonJS modules that cause issues
      "web3-provider-engine": path.resolve(__dirname, "./src/polyfills/web3-provider-engine"),
      "web3-provider-engine/subproviders/cache": path.resolve(__dirname, "./src/polyfills/web3-provider-engine/subproviders/cache.js"),
      "web3-provider-engine/subproviders/fixture": path.resolve(__dirname, "./src/polyfills/web3-provider-engine/subproviders/fixture.js"),
      "web3-provider-engine/subproviders/nonce-tracker": path.resolve(__dirname, "./src/polyfills/web3-provider-engine/subproviders/nonce-tracker.js"),
      "web3-provider-engine/subproviders/filters": path.resolve(__dirname, "./src/polyfills/web3-provider-engine/subproviders/filters.js"),
      "web3-provider-engine/subproviders/hooked-wallet": path.resolve(__dirname, "./src/polyfills/web3-provider-engine/subproviders/hooked-wallet.js"),
      "web3-provider-engine/subproviders/subscriptions": path.resolve(__dirname, "./src/polyfills/web3-provider-engine/subproviders/subscriptions.js")
    },
    // Ensure we prefer browser versions of packages
    mainFields: ['browser', 'module', 'main']
  },
  optimizeDeps: {
    include: [
      'stream-browserify',
      'stream-http',
      'https-browserify',
      'os-browserify/browser',
      'crypto-browserify',
      'assert'
    ],
    esbuildOptions: {
      // Needed to prevent require() errors
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    commonjsOptions: {
      // This helps with CommonJS modules
      transformMixedEsModules: true,
      // Add include to prevent warnings
      include: [/node_modules/]
    }
  },
}));
