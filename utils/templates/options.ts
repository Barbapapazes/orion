import type { SelectMenuOption, TemplateOrderBy, TemplatePaidStatus, TemplateStatus } from '~/types'

interface templateSortOption extends SelectMenuOption {
  value: TemplateOrderBy
  label: string
}
/**
 * Options for sorting templates
 */
export const templateSortOptions: templateSortOption[] = [{
  value: 'random',
  label: 'Random',
}, {
  value: 'createdAt',
  label: 'Created At',
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

export interface TemplatePaidStatusOption extends SelectMenuOption {
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
