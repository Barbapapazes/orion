import sanitizeHtml from 'sanitize-html'
import { randomUUID } from 'uncrypto'
import { createTemplateTextValidator } from '~/utils'
import { TEMPLATE_IMAGE_FORMAT, TEMPLATE_MAX_IMAGE_SIZE } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  await authorize(event, createTemplate)

  /**
   * Validate the text.
   */
  const formData = await readFormData(event)
  // Since the data will be validated, we can safely use a type Record.
  const data: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    if (key === 'moduleIds') {
      data[key] = formData.getAll(key)
      continue
    }
    if (key === 'featuredImage' || key === 'additionalImages') {
      continue
    }
    data[key] = value
  }
  // Use `parseAsync` to throw a custom error on validation failure. We do it this way to stay consistent with the `ensureBlob` function. Using a `safeParse` would require a manual error handling (but it's also possible).
  const body = await createTemplateTextValidator.parseAsync(data).catch((error) => {
    throw createError({
      statusCode: 400,
      message: error.errors[0].message,
    })
  })

  /**
   * Validate the featured image.
   */
  const featuredImage = formData.get('featuredImage') as File
  ensureBlob(formData.get('featuredImage') as File, {
    // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
    maxSize: `${TEMPLATE_MAX_IMAGE_SIZE}B`,
    types: TEMPLATE_IMAGE_FORMAT,
  })

  const savedFeaturedImage = await hubBlob().put(randomUUID(), featuredImage, {
    prefix: TEMPLATE_PREFIX,
  })

  /**
   * Validate the additional images.
   */
  const additionalImages = formData.getAll('additionalImages') as File[]
  for (const image of additionalImages) {
    ensureBlob(image, {
    // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
      maxSize: `${TEMPLATE_MAX_IMAGE_SIZE}B`,
      types: TEMPLATE_IMAGE_FORMAT,
    })
  }

  const additionalImagePromises = additionalImages.map(async (image) => {
    return hubBlob().put(randomUUID(), image, {
      prefix: TEMPLATE_PREFIX,
    })
  })
  const savedAdditionalImages = await Promise.all(additionalImagePromises)

  const { user } = await requireUserSession(event)
  const [template] = await useDrizzle().insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    featuredImage: savedFeaturedImage.pathname,
    additionalImages: savedAdditionalImages.map(image => image.pathname),
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
    slug: tables.templates.slug,
    hash: tables.templates.hash,
  })

  if (body.moduleIds?.length) {
    await useDrizzle().insert(tables.modulesToTemplates).values(body.moduleIds.map(id => ({ moduleId: id, templateId: template.id }))).execute()
  }

  setResponseStatus(event, 201)
  return template
})
