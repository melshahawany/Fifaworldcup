import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/world-cup-icon.svg", "icons/world-cup-192.png", "icons/world-cup-512.png"],
      manifest: {
        name: "كأس العالم 2026 | World Cup 2026",
        short_name: "كأس العالم",
        description: "متابعة المباريات والترتيب والإحصائيات وحساب التأهل",
        theme_color: "#0f2d5a",
        background_color: "#0a0f1e",
        display: "standalone",
        orientation: "any",
        start_url: "/",
        scope: "/",
        lang: "ar",
        dir: "rtl",
        icons: [
          {
            src: "/icons/world-cup-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/world-cup-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icons/world-cup-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.google\.com\/maps\//,
            handler: "NetworkOnly"
          }
        ]
      }
    })
  ]
});
