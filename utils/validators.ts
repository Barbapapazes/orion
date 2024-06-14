import { string, enum as zEnum, object, number, array, any } from 'zod'
import { type output } from 'zod'
import { CATEGORY_MAX_NAME_LENGTH, TEMPLATE_MAX_DESCRIPTION_LENGTH, TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, TEMPLATE_IMAGE_FORMAT, TEMPLATE_MAX_IMAGE_SIZE, TEMPLATE_MAX_ADDITIONAL_IMAGES, TEMPLATE_MIN_SHORT_DESCRIPTION_LENGTH, TEMPLATE_MAX_IMAGE_SIZE_KB, TEMPLATE_MIN_TITLE_LENGTH, TEMPLATE_MAX_TITLE_LENGTH, TEMPLATE_PAID_STATUS } from './constants'

export const createCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})
export type CreateCategoryValidatorSchema = output<typeof createCategoryValidator>

export const editCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})
export type EditCategoryValidatorSchema = output<typeof editCategoryValidator>

const imageValidator = any().refine(file => file instanceof File, { message: 'Required' }).refine(file => file?.size < TEMPLATE_MAX_IMAGE_SIZE, { message: `Max ${TEMPLATE_MAX_IMAGE_SIZE_KB}kb` }).refine(file => TEMPLATE_IMAGE_FORMAT.includes(file?.type), { message: `Invalid format, must be one of ${TEMPLATE_IMAGE_FORMAT.join(', ')}` })
/**
 * Zod is able to validate file BUT the schema is used on the client and the server. On client, it works fine but on the server, we need to use `ensureBlob` to validate the file.
 *
 * ```ts
 * featuredImage: any().refine((file) => file instanceof File, { message: 'Required' })
 *   .refine(file => file?.size < TEMPLATE_MAX_IMAGE_SIZE, { message: 'Max 500kb' })
 *   .refine(file => TEMPLATE_IMAGE_FORMAT.includes(file?.type), { message: `Invalid format, must be one of ${TEMPLATE_IMAGE_FORMAT.join(', ')}` })
 * ```
 *
 * On the client, we can use both a Zod schema, like the one above, or a custom validation in the `validate` function. I'm not sure about the best approach. I'll use the Zod schema for now and see if it works well.
 */
export const createTemplateImagesValidator = object({
  featuredImage: imageValidator,
  additionalImages: array(imageValidator)
    .max(TEMPLATE_MAX_ADDITIONAL_IMAGES, {
      message: `Max ${TEMPLATE_MAX_ADDITIONAL_IMAGES} images`,
    }),
})

export const createTemplateTextValidator = object({
  title: string({ message: 'Required' }).min(TEMPLATE_MIN_TITLE_LENGTH, { message: `Min ${TEMPLATE_MIN_TITLE_LENGTH} characters` }).max(TEMPLATE_MAX_TITLE_LENGTH, { message: `Max ${TEMPLATE_MAX_TITLE_LENGTH} characters` }),
  paidStatus: zEnum(TEMPLATE_PAID_STATUS, { message: 'Required' }),
  categoryId: number({ message: 'Required', coerce: true }),
  moduleIds: array(number({ coerce: true })).max(6, { message: `Max 6 modules` }).optional(),
  liveUrl: string().url().optional(),
  accessUrl: string({ message: 'Required' }).url(),
  shortDescription: string({ message: 'Required' }).min(TEMPLATE_MIN_SHORT_DESCRIPTION_LENGTH, { message: `Min ${TEMPLATE_MIN_SHORT_DESCRIPTION_LENGTH} characters` }).max(TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, { message: `Max ${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters` }),
  description: string().max(TEMPLATE_MAX_DESCRIPTION_LENGTH, {
    message: `Max ${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`,
  }).optional(),
})
export type CreateTemplateTextValidatorSchema = output<typeof createTemplateTextValidator>

export const createTemplateValidator = createTemplateTextValidator.merge(createTemplateImagesValidator)
export type CreateTemplateValidatorSchema = output<typeof createTemplateValidator>

export const editTemplateContentValidator = object({
  title: string({ message: 'Required' }),
  paidStatus: zEnum(TEMPLATE_PAID_STATUS, { message: 'Required' }),
  categoryId: number({ message: 'Required', coerce: true }),
  moduleIds: array(number()).max(6, { message: `Max 6 modules` }).optional(),
  liveUrl: string().url().optional(),
  accessUrl: string({ message: 'Required' }).url(),
  shortDescription: string({ message: 'Required' }).max(TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, { message: `Max ${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters` }),
  description: string().max(TEMPLATE_MAX_DESCRIPTION_LENGTH, {
    message: `Max ${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`,
  }).optional(),
})
