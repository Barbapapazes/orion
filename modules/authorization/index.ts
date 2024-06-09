import { addComponentsDir, addServerImportsDir, createResolver, defineNuxtModule, addImportsDir, addServerImports, addImports } from 'nuxt/kit'
import { version } from '../../package.json'

// const log = logger.withTag('nuxthub-authorization')

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxthub-authorization',
    configKey: 'hub',
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
  },
})
