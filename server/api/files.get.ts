export default defineEventHandler(async (event) => {
  return hubBlob().list()
})
