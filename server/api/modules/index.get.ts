import { cachedModules } from '~/server/utils/cache'

export default defineEventHandler(async (event) => {
  await authorize(event, listModules)

  const modules = await cachedModules(event)

  return modules
})
