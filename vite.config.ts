import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Remove lovable-tagger dependency
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    // Remove lovable-tagger plugin
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
      // Include specific polyfills needed for web3 libraries
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
        'url'
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
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    sourcemap: true,
    // Use esbuild minifier instead of terser
    minify: 'esbuild',
  },
}));
