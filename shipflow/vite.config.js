import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // 1. Target modern mobile browsers (drops heavy legacy JS polyfills)
    target: "esnext",
    
    // 2. Enable CSS code-splitting so mobile only downloads CSS for visible components
    cssCodeSplit: true,
    
    // 3. Optimized build output & chunking
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split heavy libraries away from the main entry file
        manualChunks: (id) => {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-framer";
          }
        },
        // Clean asset names for better browser caching
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  // 4. Strip console.log and debugger statements from the production build
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },
});