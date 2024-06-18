import { any } from 'zod'
import { TEMPLATE_MAX_IMAGE_SIZE_KB, TEMPLATE_IMAGE_FORMAT } from './constants'

export const imageValidator = any().refine(file => file instanceof File, { message: 'Required' }).refine(file => file?.size < TEMPLATE_MAX_IMAGE_SIZE, { message: `Max ${TEMPLATE_MAX_IMAGE_SIZE_KB}kb` }).refine(file => TEMPLATE_IMAGE_FORMAT.includes(file?.type), { message: `Invalid format, must be one of ${TEMPLATE_IMAGE_FORMAT.join(', ')}` })
