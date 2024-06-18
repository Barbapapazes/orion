/**
 * Error when categories are not found
 */
export const categoriesNotFoundError = createError({
  statusCode: 404,
  message: 'Categories not found',
  fatal: true,
})
