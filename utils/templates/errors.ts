/**
 * Error when a template is not found
 */
export const templateNotFoundError = createError({
  statusCode: 404,
  message: 'Template not found',
  fatal: true,
})
