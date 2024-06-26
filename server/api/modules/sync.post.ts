import { syncModules } from '~/utils'

interface Modules {
  modules: { name: string, repo: string, icon: string, type: 'official' | 'community' }[]
}

export default defineEventHandler(async (event) => {
  await authorize(event, syncModules)

  const data = await $fetch('https://api.nuxt.com/modules') as Modules
  const modules = data.modules
    .filter(({ type }) => type === 'official' || type === 'community')
    .map(({ name, type, icon, repo }) => ({ name, type, icon, repo, slug: useSlugify(name) }))

  // A values cannot insert more than 100 bound parameters.
  // So we need to insert in multiple times
  const columnsPerModule = Object.keys(modules[0]).length
  const insertPerLoop = Math.floor(100 / columnsPerModule)
  const loops = Math.ceil(modules.length / insertPerLoop)

  for (let loop = 0; loop < loops; loop++) {
    const values = modules.slice(loop * insertPerLoop, (loop + 1) * insertPerLoop)
    await useDrizzle().insert(tables.modules).values(values)
      .onConflictDoNothing({ target: tables.modules.slug }).execute().catch((error) => {
        console.error(error)
        sendDiscordNotification(event, 'Failed to sync modules', { level: 'error', message: error.message })
        throw createError({
          status: 500,
          message: 'Failed to sync modules',
        })
      })
  }

  // Remove cache to force a refresh
  deleteCachedModules(event)

  sendDiscordNotification(event, 'Modules synced', { level: 'success' })

  return sendNoContent(event, 204)
})
