export default defineEventHandler((event) => {
  return sendRedirect(event, '/templates', 302)
})
