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

  extends: ['@nuxt/ui-pro'],
  modules: ['nuxt-auth-utils', '@nuxthub/core', '@nuxt/ui', '@nuxt/eslint'],

  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  hub: {
    database: true,
    blob: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  devtools: { enabled: true },
})
