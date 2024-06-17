import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().override('nuxt/vue/rules', {
  rules: {
    'vue/no-deprecated-v-on-native-modifier': 'off',
  },
})
