// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Set compatibility date
  compatibilityDate: '2024-12-18',

  // Enable type checking during build
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Modules
  modules: [
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n'
  ],

  // Supabase configuration
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/*'],
    }
  },

  // Runtime config
  runtimeConfig: {
    // Private keys that are exposed to the server
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },

  // Nitro configuration
  nitro: {
  },

  // App config
  app: {
    head: {
      titleTemplate: '%s - SaaS App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    },
  },

  // Build configuration
  build: {
    transpile: ['vuetify']
  },

  // CSS
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css'
  ],

  // Development tools
  devtools: { enabled: true }
})
