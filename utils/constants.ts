export const MODULE_ICON_PREFIX = 'https://ipx.nuxt.com/s_80,f_auto/gh/nuxt/modules/main/icons'

export const CATEGORY_ICON = 'i-heroicons-tag'
export const TEMPLATE_ICON = 'i-heroicons-rectangle-group'

/**
 * Admin: can manage all templates
 * Creator: can manage only his templates
 * Banned: can't manage any templates but have access to the templates
 */
export const USER_ROLE_TYPE = ['admin', 'creator', 'banned'] as const

export const CATEGORY_MAX_NAME_LENGTH = 20

export const TEMPLATE_MIN_TITLE_LENGTH = 3
export const TEMPLATE_MAX_TITLE_LENGTH = 100
export const TEMPLATE_MAX_DESCRIPTION_LENGTH = 2000
export const TEMPLATE_MIN_SHORT_DESCRIPTION_LENGTH = 20
export const TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH = 120

export const TEMPLATE_MAX_ADDITIONAL_IMAGES = 3
// TODO: update typing https://github.com/nuxt-hub/core/issues/141
export const TEMPLATE_MAX_IMAGE_SIZE = 512_000
export const TEMPLATE_MAX_IMAGE_SIZE_KB = TEMPLATE_MAX_IMAGE_SIZE / 1000
export const TEMPLATE_IMAGE_WIDTH = 1920
export const TEMPLATE_IMAGE_HEIGHT = 1080
// TODO: update typing https://github.com/nuxt-hub/core/issues/141
export const TEMPLATE_IMAGE_FORMAT = ['image/jpeg', 'image/jpg', 'image/png'] as const

/**
 * Submitted: when a user submits a new template
 * Reviewed: when a user's template is reviewed by an admin and should be updated (move to submitted).
 * Refused: when a user's template is refused by an admin
 * Validated: when a user's template is validated by an admin and visible by everyone
 */
export const TEMPLATE_STATUS = ['submitted', 'reviewed', 'refused', 'validated'] as const
/**
 * Free: when a template is free
 * Freemium: when a template is free but has some paid features
 * Premium: when a template is paid
 */
export const TEMPLATE_PAID_STATUS = ['free', 'freemium', 'premium'] as const
