interface Modules {
  modules: { name: string, repo: string, icon: string, type: 'official' | 'community' }[]
}

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const data = await $fetch<Modules>('https://api.nuxt.com/modules')
  const modules = data.modules
    .map(({ name, type, icon, repo }) => ({ name, type, icon, repo }))
    .filter(({ type }) => type === 'official' || type === 'community')

  // A values cannot insert more than 100 bound parameters.
  // So we need to insert in multiple times
  const columnsPerModule = Object.keys(modules[0]).length
  const insertPerLoop = Math.floor(100 / columnsPerModule)
  const loops = Math.ceil(modules.length / insertPerLoop)

  for (let loop = 0; loop < loops; loop++) {
    const values = modules.slice(loop * insertPerLoop, (loop + 1) * insertPerLoop)
    await useDrizzle().insert(tables.modules).values(values)
      .onConflictDoNothing({ target: tables.modules.repo }).execute()
  }

  return sendNoContent(event, 204)
})
