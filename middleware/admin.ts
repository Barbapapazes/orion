export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession()

  const isAdmin = user.value?.roleType === 'admin'

  if (!isAdmin) {
    return redirectTo('/')
  }
})
