import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { host: "0.0.0.0" },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["gsap", "lenis"],
          "lottie-vendor": ["lottie-web/build/player/lottie_light"],
          "swiper-vendor": ["swiper/bundle"],
        },
      },
    },
  },
});
