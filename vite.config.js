import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    ssr: false
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
    middleware: {
      // add a rewrite rule to handle requests for routes in your application
      // that should be handled by your React application
      1: (req, res, next) => {
        if (req.originalUrl.startsWith('/*')) {
          req.url = req.originalUrl.replace('/*', '/');
        }
        next();
      }
    }
  },
});
