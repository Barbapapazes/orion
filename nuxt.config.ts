// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  extends: ['@nuxt/ui-pro'],
  modules: ["nuxt-auth-utils", "@nuxthub/core", "@nuxt/ui", "@nuxt/eslint"],
  runtimeConfig: {
    oauth: {
      github: {
        clientId: "",
        clientSecret: "",
      },
    },
  },
  hub: {
    database: true,
  },
});