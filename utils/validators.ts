import { string, enum as zEnum, object, number, array } from 'zod'
import { CATEGORY_MAX_NAME_LENGTH, PAID_STATUS, TEMPLATE_MAX_DESCRIPTION_LENGTH, TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH } from './constants'

export const createCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})

export const updateCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})

export const createTemplateValidator = object({
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
