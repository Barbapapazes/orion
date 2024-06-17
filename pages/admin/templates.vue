<script lang="ts" setup>
import type { TemplatePaidStatus, TemplateStatus } from '~/types'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

useSeoMeta({
  title: 'Templates',
})

const defaultColumns = [{
  key: 'id',
  label: '#',
}, {
  key: 'title',
  label: 'Title',
  sortable: true,
}, {
  key: 'shortDescription',
  label: 'Short Description',
}, {
  key: 'category',
  label: 'Category',
}, {
  key: 'status',
  label: 'Status',
  sortable: true,
}, {
  key: 'paidStatus',
  label: 'Paid Status',
  sortable: true,
}, {
  key: 'liveUrl',
  label: 'Live URL',
}, {
  key: 'accessUrl',
  label: 'Access URL',
},

{
  key: 'createdBy',
  label: 'Created By',
}, {
  key: 'updatedAt',
  label: 'Updated At',
  sortable: true,
}, {
  key: 'actions',
  label: 'Actions',
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const categories = await useFetchCategories()

const page = ref(1)
const sort = ref({ column: 'updatedAt', direction: 'desc' as const })

const search = ref<string | undefined>(undefined)
const searchDebounced = useDebounce(search, 300)
const status = ref<TemplateStatus | undefined>(undefined)
const paidStatus = ref<TemplatePaidStatus | undefined>(undefined)
const categoryId = ref<number | undefined>(undefined)
const creator = ref<Pick<User, 'id' | 'login' | 'name' | 'avatarUrl'> | undefined>(undefined)

const { data, refresh, pending } = await useAsyncData(() => useRequestFetch()('/api/templates', {
  query: {
    page: page.value,
    order: sort.value.direction,
    orderBy: sort.value.column,
    search: search.value,
    status: status.value,
    paidStatus: paidStatus.value,
    categoryId: categoryId.value,
    creator: creator.value?.id,
    fields: ['creator.email', 'updatedAt'],
  },
}), {
  deep: false,
  lazy: true,
  default: () => emptyPagination,
  watch: [page, sort, searchDebounced, status, paidStatus, categoryId, creator],
})

const meta = computed(() => data.value.meta)
const limit = computed(() => meta.value.limit)
const total = computed(() => meta.value.total)
const hasMoreTemplates = computed(() => total.value > limit.value)

const templates = computed(() => data.value.data)
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Templates"
        :badge="data.meta.total"
      >
        <template #right>
          <AdminRefreshButton
            :loading="pending"
            @click="refresh"
          />
        </template>
      </UDashboardNavbar>

      <AdminTemplatesToolbar
        v-model:search="search"
        v-model:status="status"
        v-model:paidStatus="paidStatus"
        v-model:categoryId="categoryId"
        v-model:selectedColumns="selectedColumns"
        v-model:creator="creator"
        :columns="defaultColumns"
        :categories="categories ?? []"
      />

      <AdminTemplatesTable
        v-model:sort="sort"
        :columns="columns"
        :templates="templates as any"
        :pending="pending"
        @refresh="refresh"
      />

      <div class="mt-8 flex justify-center">
        <UPagination
          v-if="hasMoreTemplates"
          v-model="page"
          :page-count="limit"
          :total="total"
        />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
