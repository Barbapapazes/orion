import type { Pagination } from '~/types'

export const emptyPagination = {
  data: [],
  meta: {
    total: 0,
    limit: 0,
    page: 0,
  },
} satisfies Pagination<unknown>
