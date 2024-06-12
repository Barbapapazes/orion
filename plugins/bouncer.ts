export default defineNuxtPlugin({
  name: 'bouncer',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: () => useUserSession().user.value,
        },
      },
    }
  },
})
