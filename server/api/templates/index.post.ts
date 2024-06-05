import sanitizeHtml from 'sanitize-html'
import { randomUUID } from 'uncrypto'
import { TEMPLATE_IMAGE_FORMAT, TEMPLATE_MAX_IMAGE_SIZE } from '~/utils/constants'
import { createTemplateValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const formData = await readFormData(event)
  // const body = await readValidatedBody(event, createTemplateValidator.parse)
  // const body = await createTemplateValidator.parse({
  //   // we need to build this object using the form data to avoid to put null inside the object
  //   title: formData.get('title'),
  //   categoryId: formData.get('categoryId'),
  //   paidStatus: formData.get('paidStatus'),
  //   liveUrl: formData.get('liveUrl') === null ? undefined : formData.get('liveUrl'),
  //   accessUrl: formData.get('accessUrl'),
  //   shortDescription: formData.get('shortDescription'),
  //   description: formData.get('description'),
  //   moduleIds: formData.getAll('moduleIds'),
  // })
  const data: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    if (key === 'moduleIds') {
      data[key] = formData.getAll(key)
      continue
    }
    if (key === 'featuredImage') {
      continue
    }

    data[key] = value
  }
  // The featured image is validated using the NuxtHub Blob API.
  const body = createTemplateValidator.omit({ featuredImage: true }).parse(data)

  const featuredImage = formData.get('featuredImage') as File
  ensureBlob(formData.get('featuredImage') as File, {
    // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
    maxSize: `${TEMPLATE_MAX_IMAGE_SIZE}B`,
    types: TEMPLATE_IMAGE_FORMAT,
  })

  const blob = await hubBlob().put(randomUUID(), featuredImage, {
    prefix: 'templates',
  })

  const [template] = await useDrizzle().insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    featuredImage: blob.pathname,
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
    await useDrizzle().insert(tables.modulesToTemplates).values(body.moduleIds.map(id => ({ moduleId: id, templateId: template.id }))).execute()
  }

  return sendNoContent(event, 201)
})
