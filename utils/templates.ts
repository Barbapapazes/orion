import type { SelectMenuOption, TemplatePaidStatus, TemplateSort, TemplateStatus } from '~/types'

interface templateSortOption extends SelectMenuOption {
  value: TemplateSort
  label: string
}
/**
 * Options for sorting templates
 */
export const templateSortOptions: templateSortOption[] = [{
  value: 'random',
  label: 'Random',
}, {
  value: 'created',
  label: 'Created',
}, {
  value: 'title',
  label: 'Title',
}]

interface TemplateStatusOption extends SelectMenuOption {
  value: TemplateStatus
  label: string
}
/**
 * Options for the status of a template
 */
export const templateStatusOptions: TemplateStatusOption[] = [{
  value: 'submitted',
  label: 'Submitted',
}, {
  value: 'reviewed',
  label: 'Reviewed',
}, {
  value: 'refused',
  label: 'Refused',
}, {
  value: 'validated',
  label: 'Validated',
}]

interface TemplatePaidStatusOption extends SelectMenuOption {
  value: TemplatePaidStatus
  label: string
}
/**
 * Options for the paid status of a template
 */
export const templatePaidStatusOptions: TemplatePaidStatusOption[] = [{
  value: 'free',
  label: 'Free',
}, {
  value: 'freemium',
  label: 'Freemium',
}, {
  value: 'premium',
  label: 'Premium',
}]

interface GenerateShowTemplateURLElements {
  slug: string
  hash: string
  categorySlug: string
}
/**
 * Generate the URL for the show page of a template
 */
export function generateShowTemplateURL(elements: GenerateShowTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}`
}

interface GenerateEditTextTemplateURLElements extends GenerateShowTemplateURLElements {}
/**
 * Generate the URL for the edit text page of a template
 */
export function generateEditTextTemplateURL(elements: GenerateEditTextTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/text`
}

interface GenerateEditImagesTemplateURLElements extends GenerateShowTemplateURLElements {}
/**
 * Generate the URL for the edit images page of a template
 */
export function generateEditImagesTemplateURL(elements: GenerateEditImagesTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/images`
}

/**
 * Error when a template is not found
 */
export const templateNotFoundError = createError({
  statusCode: 404,
  message: 'Template not found',
  fatal: true,
})
