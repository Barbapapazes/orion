interface Modules {
  modules: { name: string, repo: string, icon: string, type: 'official' | 'community' }[]
}

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  /**
   * Fetch api.nuxt.com/modules
   * Clean data (only keep name and type, offical and community)
   * Save data in the database
   */
  const data = await $fetch<Modules>('https://api.nuxt.com/modules', {
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const modules = data.modules
    .map(({ name, type, icon, repo }) => ({ name, type, icon, repo }))
    .filter(({ type }) => type === 'official' || type === 'community')

  const keys = Object.keys(modules[0]).length

  // A values cannot insert more than 100 bound parameters.
  // So we need to insert in multiple times

  const maximumInsert = Math.floor(100 / keys)
  const times = Math.ceil(modules.length / maximumInsert)

  for (let i = 0; i < times; i++) {
    const values = modules.slice(i * maximumInsert, (i + 1) * maximumInsert)
    await useDrizzle().insert(tables.modules).values(values)
    .onConflictDoNothing({ target: modules.repo }).execute()
  }

  return sendNoContent(event, 204)
})
