import type { InternalApi } from 'nitropack'

/**
 * Fetches the categories from the API
 */
export const useFetchCategories = () => {
  const { data: categories, error } = useFetch('/api/categories', {
    key: 'categories',
    deep: false,
    default: () => [] as InternalApi['/api/categories']['get'],
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] as InternalApi['/api/categories']['get'] | undefined
    },
  })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
      fatal: true,
    })
  }

  return categories
}
