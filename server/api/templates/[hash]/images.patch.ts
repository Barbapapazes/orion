import { randomUUID } from 'uncrypto'
import { object, string } from 'zod'
import { updateTemplate } from '~/utils'
import { TEMPLATE_IMAGE_FORMAT, TEMPLATE_MAX_IMAGE_SIZE } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, object({
    hash: string(),
  }).parse)

  const template = await useDrizzle().query.templates.findFirst({
    where: eq(tables.templates.hash, params.hash),
    columns: {
      id: true,
      featuredImage: true,
      additionalImages: true,
      creatorId: true,
    },
  })

  if (!template) {
    throw createError({
      statusCode: 404,
      message: 'Template not found',
    })
  }

  await authorize(event, updateTemplate, template)

  const formData = await readFormData(event)

  const featuredImage = formData.get('featuredImage')
  const additionalImages = formData.getAll('additionalImages')

  // If the featured is a file, it's means it's a new image that needs to be stored
  let featuredImageName: string = template.featuredImage
  if (featuredImage instanceof File) {
    // Validate the featured image.
    ensureBlob(formData.get('featuredImage') as File, {
    // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
      maxSize: `${TEMPLATE_MAX_IMAGE_SIZE}B`,
      // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
      types: TEMPLATE_IMAGE_FORMAT,
    })
    // Remove the old featured image
    await hubBlob().del(template.featuredImage)
    // Save the new featured image
    featuredImageName = await hubBlob().put(randomUUID(), featuredImage, {
      prefix: TEMPLATE_PREFIX,
    }).then(blob => blob.pathname)
  }

  // Additional images are an array of string or file. String are current images, file are new images.
  // First, we remove the old images that are not in the new list
  const oldAdditionalImages: string[] = []
  for (const image of (template.additionalImages || [])) {
    if (!additionalImages.includes(image)) {
      oldAdditionalImages.push(image)
    }
  }

  // Then we remove the old images
  for (const image of oldAdditionalImages) {
    await hubBlob().del(image)
  }

  // Then we save the new images
  const newAdditionalImages: string[] = []
  for (const image of additionalImages) {
    if (typeof image === 'string') {
      newAdditionalImages.push(image)
    }

    if (image instanceof File) {
      ensureBlob(image, {
      // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
        maxSize: `${TEMPLATE_MAX_IMAGE_SIZE}B`,
        // @ts-expect-error NuxtHub should export BlobValidateOptions and related types
        types: TEMPLATE_IMAGE_FORMAT,
      })
      const uploadedImage = await hubBlob().put(randomUUID(), image, {
        prefix: TEMPLATE_PREFIX,
      })
      newAdditionalImages.push(uploadedImage.pathname)
    }
  }

  // Save the template
  await useDrizzle().update(tables.templates).set({
    featuredImage: featuredImageName,
    additionalImages: newAdditionalImages,
  })
    .where(and(eq(tables.templates.hash, params.hash)))
    .execute()

  return sendNoContent(event, 204)
})
