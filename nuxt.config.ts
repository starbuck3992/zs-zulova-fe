// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://localhost:8055',
        }
    },
  devtools: { enabled: true },
  modules: [
      '@nuxtjs/tailwindcss',
  ],
})
