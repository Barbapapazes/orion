export const MODULE_ICON_PREFIX = 'https://ipx.nuxt.com/s_80,f_auto/gh/nuxt/modules/main/icons'

// Navigation
export const HOME_ICON = 'i-ph-house-duotone'
export const USER_ICON = 'i-ph-user-duotone'
export const USERS_ICON = 'i-ph-users-three-duotone'
export const ADMIN_ICON = 'i-ph-shield-duotone'

// Business
export const CATEGORY_ICON = 'i-ph-tag-duotone'
export const MODULE_ICON = 'i-ph-archive-duotone'
export const TEMPLATE_ICON = 'i-ph-book-duotone'

// Action
export const SIGN_OUT_ICON = 'i-ph-sign-out'
export const MORE_VERTICAL_ICON = 'i-ph-dots-three-vertical'
export const EYE_ICON = 'i-ph-eye-duotone'
export const EDIT_ICON = 'i-ph-note-pencil-duotone'
export const CLIPBOARD_ICON = 'i-ph-clipboard-duotone'
export const PLUS_ICON = 'i-ph-plus'
export const TRASH_ICON = 'i-ph-trash-duotone'
export const X_ICON = 'i-ph-x'
export const UNLOCK_ICON = 'i-ph-lock-open-duotone'
export const LOCK_ICON = 'i-ph-lock-duotone'
export const EXTERNAL_LINK_ICON = 'i-ph-arrow-square-out-duotone'

// Element
export const PHOTO_ICON = 'i-ph-image-duotone'
export const PEN_ICON = 'i-ph-pen-duotone'
export const DOCUMENT_ICON = 'i-ph-file-text-duotone'

// Table
export const FADER_ICON = 'i-ph-faders'
export const LOAD_ICON = 'i-ph-arrows-clockwise-duotone'
export const SEARCH_ICON = 'i-ph-magnifying-glass-duotone'
export const SORT_DESC_ICON = 'i-ph-sort-ascending'
export const SORT_ASC_ICON = 'i-ph-sort-descending'

// Notification
export const INFORMATION_CIRCLE_ICON = 'i-ph-info-duotone'
export const CHECK_CIRCLE_ICON = 'i-ph-check-circle-duotone'
export const X_CIRCLE_ICON = 'i-ph-x-circle-duotone'

export const ORDER = ['asc', 'desc'] as const

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
