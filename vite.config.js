import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            includeAssets: ["icons/icon.svg", "pwa-192.png", "pwa-512.png"],
            manifest: {
                name: "PraxisGrid",
                short_name: "PraxisGrid",
                description: "Learn it. Practise it. Prove it.",
                theme_color: "#0f6cbd",
                background_color: "#f8fbff",
                display: "standalone",
                orientation: "portrait",
                start_url: "/",
                scope: "/",
                icons: [
                    { src: "/pwa-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
                    { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
                ]
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
                navigateFallback: "/index.html",
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return request.destination === "document";
                        },
                        handler: "NetworkFirst",
                        options: { cacheName: "pages-cache" }
                    },
                    {
                        urlPattern: function (_a) {
                            var request = _a.request;
                            return ["script", "style", "image", "font"].includes(request.destination);
                        },
                        handler: "StaleWhileRevalidate",
                        options: { cacheName: "assets-cache" }
                    }
                ]
            },
            devOptions: { enabled: true }
        })
    ]
});
