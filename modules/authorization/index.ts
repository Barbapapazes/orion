import { addComponentsDir, addServerImportsDir, createResolver, defineNuxtModule, addImportsDir, addServerImports, addImports, addTypeTemplate, addPlugin } from 'nuxt/kit'
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
  async setup(options) {
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
    addTypeTemplate({
      filename: 'modules/authorization/resolver-client.d.ts',
      getContents: () => `
interface User {}

declare module '#app' {
  interface NuxtApp {
    $authorization: {
      resolveClientUser: () => Promise<User | null>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $authorization: {
      resolveClientUser: () => Promise<User | null>
    }
  }
}

export {}
      `,
      write: true,
    })

    // Register server resolver

  },
})
