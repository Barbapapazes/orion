// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: {
        dir: 'ltr',
        class: 'scroll-smooth',
      },
    },
  },
  runtimeConfig: {
    discordWebhookUrl: '',
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
  },
  routeRules: {
    '/': {
      redirect: '/templates',
    },
    '/templates': {
      robots: true,
      sitemap: true,
    },
    '/admin': {
      redirect: '/admin/templates',
    },
    '/admin/**': {
      robots: false,
      sitemap: false,
    },
    '/profile': {
      robots: false,
      sitemap: false,
    },
  },

  experimental: {
    viewTransition: true,
  },

  css: ['~/assets/css/main.css'],

  extends: ['@nuxt/ui-pro'],
  modules: [
    'nuxt-auth-utils',
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-authorization',
    '@vueuse/nuxt',
    'nuxt-simple-robots',
    '@nuxtjs/sitemap',
  ],

  ui: {
    icons: ['ph', 'simple-icons'],
    safelistColors: ['yellow', 'green', 'blue', 'orange', 'red'], // Used in badge as dynamic color.
  },

  hub: {
    database: true,
    blob: true,
    cache: true,
  },

  colorMode: {
    preference: 'system',
  },

  sitemap: {
    cacheMaxAgeSeconds: 60 * 60 * 24, // 24 hours
    sources: [
      '/api/__sitemap__/urls',
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  devtools: { enabled: true },
})
