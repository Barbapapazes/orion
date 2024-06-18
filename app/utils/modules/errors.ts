/**
 * Error when modules are not found
 */
export const modulesNotFoundError = createError({
  statusCode: 404,
  message: 'Modules not found',
  fatal: true,
})
