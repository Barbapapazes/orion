import sanitizeHtml from 'sanitize-html'
import { createTemplateValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const formData = await readFormData(event)
  // const body = await readValidatedBody(event, createTemplateValidator.parse)
  const body = await createTemplateValidator.parse({
    // we need to build this object using the form data to avoid to put null inside the object
    title: formData.get('title'),
    categoryId: formData.get('categoryId'),
    paidStatus: formData.get('paidStatus'),
    liveUrl: formData.get('liveUrl') === null ? undefined : formData.get('liveUrl'),
    accessUrl: formData.get('accessUrl'),
    shortDescription: formData.get('shortDescription'),
    description: formData.get('description'),
    moduleIds: formData.getAll('moduleIds'),
  })

  // ensure it's a blob (but maybe, this can be done in the validator
  const featuredImage = formData.get('featuredImage') as File

  await hubBlob().put(featuredImage.name, featuredImage)

  console.log(body)

  const [template] = await useDrizzle().insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    featuredImage: featuredImage.name,
    title: body.title,
    categoryId: body.categoryId,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    shortDescription: body.shortDescription,
    description: body.description ? sanitizeHtml(body.description) : null,
    creatorId: user.id,
  }).returning({
    id: tables.templates.id,
  })

  if (body.moduleIds?.length) {
  // TODO: check if this is the better way to do it
    await useDrizzle().insert(tables.modulesToTemplates).values(body.moduleIds.map(id => ({ moduleId: id, templateId: template.id }))).execute()
  }

  return sendNoContent(event, 201)
})
