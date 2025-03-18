import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/aitch1155testsite/' : '/',
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
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
        'crypto'
      ]
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
