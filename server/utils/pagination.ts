import type { Pagination, PaginationMeta } from '~/types'

export function getOffset(params: { limit: number, page: number }): number {
  const { limit, page } = params
  return limit * (page - 1)
}

export function getPaginationMeta(params: { total: number, limit: number, page: number }): PaginationMeta {
  const { total, limit, page } = params
  return {
    total,
    limit,
    page,
  }
}

export function getPagination<T>(data: T[], meta: { total: number, limit: number, page: number }): Pagination<T> {
  return {
    data,
    meta: getPaginationMeta(meta),
  }
}
