import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/shared/ui"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layouts": path.resolve(__dirname, "./src/shared/layouts"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/shared/utils"),
      "@lib": path.resolve(__dirname, "./src/shared/lib"),
      "@store": path.resolve(__dirname, "./src/shared/store"),
      "@types": path.resolve(__dirname, "./src/shared/types")
    }
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    open: false
  },

  preview: {
    host: "0.0.0.0",
    port: 4173
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    // تلگرام داخل برخی گوشی‌ها (مخصوصاً اندرویدهای قدیمی‌تر) از یک System WebView
    // قدیمی استفاده می‌کنه که ممکنه بعضی سنتاکس مدرن ES2020+ رو پشتیبانی
    // نکنه و کل اسکریپت بدون اجرا بمونه و صفحه خالی بمونه.
    target: "es2017"
  }
});
