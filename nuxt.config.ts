import { naiveui, tailwindcss } from "./config";

export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: "ESP Flash Partinioner",
      meta: [
        {
          name: "description",
          content:
            "A utility to easily generate partition table for ESP32 chips",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

  modules: ["@bg-dev/nuxt-naiveui", "@nuxtjs/tailwindcss"],

  naiveui,
  tailwindcss,
});
