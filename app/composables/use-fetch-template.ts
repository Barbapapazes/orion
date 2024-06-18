import type { InternalApi } from 'nitropack'

/**
 * Fetch a template by its hash.
 *
 * Handles errors and try to retrieve the data from the cache.
 */
export const useFetchTemplate = async (hash: MaybeRef<string>) => {
  const { data: template, error } = await useFetch(`/api/templates/${toValue(hash)}`, {
    key: `template-${toValue(hash)}`,
    deep: false,
    default: () => {},
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] as InternalApi['/api/templates/:hash']['get'] | undefined
    },
  })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
      fatal: true,
    })
  }

  return template
}
