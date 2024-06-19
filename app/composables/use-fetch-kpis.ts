/**
 * Fetches the KPIs from the API
 */
export const useFetchKpis = async () => {
  const { data: kpis, error } = await useFetch('/api/kpis', {
    key: 'kpis',
    deep: false,
    default: () => ({
      creators: {
        count: 0,
      },
      categories: {
        count: 0,
      },
      templates: {
        count: 0,
      },
    }),
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key]
    },
  })

  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
      fatal: true,
    })
  }

  return kpis
}
