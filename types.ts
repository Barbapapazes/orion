export type Order = -1 | 1

export interface SelectMenuOption {
  value: string
  label: string
}

export type TemplateSort = 'random' | 'created' | 'title'
export type TemplateStatus = typeof TEMPLATE_STATUS[number]
export type TemplatePaidStatus = typeof TEMPLATE_PAID_STATUS[number]

export type PaginationMeta = {
  total: number
  limit: number
  page: number
}

export type Pagination<T> = {
  data: T[]
  meta: PaginationMeta
}
