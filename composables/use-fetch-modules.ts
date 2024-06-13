import type { InternalApi } from 'nitropack'

/**
 * Fetches the modules from the API
 */
export const useFetchModules = () => {
  const { data: modules, error } = useFetch('/api/modules', {
    key: 'modules',
    deep: false,
    default: () => [] as InternalApi['/api/modules']['get'],
    transform: (data) => {
    // Order by name and then by type (official and then community).
      return data.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.type.localeCompare(a.type))
    },
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] as InternalApi['/api/modules']['get'] | undefined
    },
  })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
      fatal: true,
    })
  }

  return modules
}
