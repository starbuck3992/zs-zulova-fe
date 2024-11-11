// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require('path');
import {cs} from './assets/presets/cs.json';

export default defineNuxtConfig({
  ssr: false,
  css: ['primevue/resources/themes/tailwind-light/theme.css'],

  runtimeConfig: {
    public: {
        apiBase: process.env.API_BASE || "http://localhost:8055",
    }
  },

  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],

  primevue: {
    usePrimeVue: true,
    options: {
      locale: cs,
      unstyled: false,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      prefix: "",
      name: undefined,
      include: ['Galleria','Paginator','Dialog','Calendar'],
      exclude: undefined,
    },
    directives: {
      prefix: "",
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
    composables: {
      prefix: "",
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
        },
      ],
    },
  },

  compatibilityDate: '2024-11-11',
});