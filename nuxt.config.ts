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
    '/admin': {
      redirect: '/admin/templates',
    },
  },

  experimental: {
    viewTransition: true,
  },

  css: ['~/assets/css/main.css'],

  extends: ['@nuxt/ui-pro'],
  modules: ['nuxt-auth-utils', '@nuxthub/core', '@nuxt/ui', '@nuxt/eslint', 'nuxt-authorization', '@vueuse/nuxt',
  ],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['yellow', 'green', 'blue', 'orange', 'red'], // Used in badge as dynamic color.
  },
  hub: {
    database: true,
    blob: true,
    cache: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  devtools: { enabled: true },
})
