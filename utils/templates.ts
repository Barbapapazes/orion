import type { SelectMenuOption, TemplatePaidStatus, TemplateSort, TemplateStatus } from '~/types'

interface templateSortOption extends SelectMenuOption {
  value: TemplateSort
  label: string
}
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
export function generateShowTemplateURL(elements: GenerateShowTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}`
}

interface GenerateEditTextTemplateURLElements extends GenerateShowTemplateURLElements {}
export function generateEditTextTemplateURL(elements: GenerateEditTextTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/text`
}

interface GenerateEditImagesTemplateURLElements extends GenerateShowTemplateURLElements {}
export function generateEditImagesTemplateURL(elements: GenerateEditImagesTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/images`
}
