import { addComponentsDir, addServerImportsDir, createResolver, defineNuxtModule, addImportsDir, addServerImports, addImports, addPlugin, addServerPlugin } from 'nuxt/kit'
import { version } from '../../package.json'

// const log = logger.withTag('nuxthub-authorization')

export interface ModuleOptions {
  preset?: 'nuxt-auth-utils'
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxthub-authorization',
    configKey: 'authorization',
    version,
  },
  async setup() {
    const { resolve } = createResolver(import.meta.url)

    const defineAbilityImport = {
      name: 'defineAbility',
      as: 'defineAbility',
      from: resolve('runtime/defineAbility'),
    }
    addImports(defineAbilityImport)
    addServerImports([
      defineAbilityImport,
    ])

    // Register utils
    addImportsDir(resolve('./runtime/utils'))
    // Register components
    addComponentsDir({
      path: resolve('runtime/components'),
    })
    // Register server utils
    addServerImportsDir(resolve('./runtime/server/utils'))

    // Register client resolver
    addPlugin(resolve('runtime/plugins/nuxt-auth-utils.ts'))

    // Register server resolver
    addServerPlugin(resolve('runtime/server/plugins/nuxt-auth-utils.ts'))
  },
})
