
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 9999,
    watch: {
      usePolling: false,
      interval: 1000,
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['@lottiefiles/dotlottie-react']
  }
}));
