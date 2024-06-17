import { listCategories } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, listCategories)

  const categories = await cachedCategories(event)

  return categories
})
