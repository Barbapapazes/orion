import { string, enum as zEnum, object, number, array, any } from 'zod'
import { CATEGORY_MAX_NAME_LENGTH, PAID_STATUS, TEMPLATE_MAX_DESCRIPTION_LENGTH, TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, TEMPLATE_IMAGE_FORMAT, TEMPLATE_MAX_IMAGE_SIZE } from './constants'

export const createCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})

export const updateCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})

export const createTemplateValidator = object({
  // featureImage: zInstanceof(File, { message: 'Required' }).refine(file => file.size < TEMPLATE_MAX_IMAGE_SIZE, { message: 'Max 500kb' }).refine(file => TEMPLATE_IMAGE_FORMAT.includes(file.type), { message: 'Invalid format' }),
  // Note available in Workers
  // .refine((file) => {
  //   const img = new Image()
  //   img.src = URL.createObjectURL(file)
  //   return img.width === TEMPLATE_IMAGE_WIDTH && img.height === TEMPLATE_IMAGE_HEIGHT
  // }
  // , { message: `Image must be ${TEMPLATE_IMAGE_WIDTH}x${TEMPLATE_IMAGE_HEIGHT}` }),
  featuredImage: any().refine((file) => {
    return Boolean(file) // ` File` is not available in Node and Workers so `file instanceof File` will not work
  }, { message: 'Required' })
    .refine(file => file?.size < TEMPLATE_MAX_IMAGE_SIZE
      , { message: 'Max 500kb' }).refine(file => TEMPLATE_IMAGE_FORMAT.includes(file?.type), { message: `Invalid format, must be one of ${TEMPLATE_IMAGE_FORMAT.join(', ')}` }),
  title: string({ message: 'Required' }),
  paidStatus: zEnum(PAID_STATUS, { message: 'Required' }),
  categoryId: number({ message: 'Required', coerce: true }),
  moduleIds: array(number({ coerce: true })).max(6, { message: `Max 6 modules` }).optional(),
  liveUrl: string().url().optional(),
  accessUrl: string({ message: 'Required' }).url(),
  shortDescription: string({ message: 'Required' }).max(TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, { message: `Max ${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters` }),
  description: string().max(TEMPLATE_MAX_DESCRIPTION_LENGTH, {
    message: `Max ${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`,
  }).optional(),
})

export const editTemplateContentValidator = object({
  title: string({ message: 'Required' }),
  paidStatus: zEnum(PAID_STATUS, { message: 'Required' }),
  categoryId: number({ message: 'Required', coerce: true }),
  moduleIds: array(number()).max(6, { message: `Max 6 modules` }).optional(),
  liveUrl: string().url().optional(),
  accessUrl: string({ message: 'Required' }).url(),
  shortDescription: string({ message: 'Required' }).max(TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, { message: `Max ${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters` }),
  description: string().max(TEMPLATE_MAX_DESCRIPTION_LENGTH, {
    message: `Max ${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`,
  }).optional(),
})
