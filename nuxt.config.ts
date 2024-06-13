// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        dir: 'ltr',
        class: 'scroll-smooth',
      },
    },
  },
  runtimeConfig: {
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
  modules: ['nuxt-auth-utils', '@nuxthub/core', '@nuxt/ui', '@nuxt/eslint', 'nuxt-authorization'],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['yellow', 'green', 'blue'], // Used in badge as dynamic color.
  },
  hub: {
    database: true,
    blob: true,
    cache: true,
  },
  authorization: {
    preset: 'nuxt-auth-utils',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  devtools: { enabled: true },
})
