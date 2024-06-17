import { string, object } from 'zod'
import { type output } from 'zod'
import { CATEGORY_MAX_NAME_LENGTH } from '../constants'

export const createCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})
export type CreateCategoryValidatorSchema = output<typeof createCategoryValidator>

export const editCategoryValidator = object({
  name: string({ message: 'Required' }).max(CATEGORY_MAX_NAME_LENGTH, { message: `Max ${CATEGORY_MAX_NAME_LENGTH} characters` }),
})
export type EditCategoryValidatorSchema = output<typeof editCategoryValidator>
