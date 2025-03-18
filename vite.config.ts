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
  },
}));
