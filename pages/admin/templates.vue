<script lang="ts" setup>
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
}, {
  key: 'shortDescription',
  label: 'Short Description',
}, {
  key: 'description',
  label: 'Description',
},
{
  key: 'category',
  label: 'Category',
},
{
  key: 'createdBy',
  label: 'Created By',
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const page = ref(1)
const { data, refresh, pending } = await useFetch('/api/templates', {
  query: {
    page,
  },
  deep: false,
  lazy: true,
  default: () => ({ data: [], meta: { total: 0, limit: 0 } }),
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Templates"
        :badge="data.meta.total"
      >
        <template #right>
          <RefreshButton
            :loading="pending"
            @click="refresh"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
          >
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UTable
        :columns="columns"
        :rows="data.data"
        :loading="pending"
      >
        <template #liveUrl-data="{ row }">
          <UButton
            v-if="row.liveUrl"
            variant="link"
            target="_blank"
            :to="row.liveUrl"
            class="flex flex-row items-center gap-1"
          >
            <span>{{ row.liveUrl }}</span>

            <span class="i-heroicons-arrow-top-right-on-square-16-solid inline-block w-4 h-4" />
          </UButton>
          <span v-else> - </span>
        </template>
        <template #accessUrl-data="{ row }">
          <UButton
            variant="link"
            target="_blank"
            :to="row.accessUrl"
            class="flex flex-row items-center gap-1"
          >
            <span>{{ row.accessUrl }}</span>

            <span class="i-heroicons-arrow-top-right-on-square-16-solid inline-block w-4 h-4" />
          </UButton>
        </template>
        <template #paidStatus-data="{ row }">
          <PaidStatusBadge :status="row.paidStatus" />
        </template>
        <template #createdBy-data="{ row }">
          <UButton
            color="gray"
            variant="ghost"
            :to="`https://github.com/${row.creator.login}`"
          >
            <img
              :src="row.creator.avatarUrl"
              alt="avatar"
              class="w-6 h-6 rounded-full"
            >
            <span>{{ row.creator.name ?? row.creator.login }}</span>
          </UButton>
        </template>
        <template #category-data="{ row }">
          {{ row.category.name }}
        </template>
        <template #description-data="{ row }">
          <div
            v-html="row.description"
          />
        </template>
      </UTable>

      <div class="mt-8 flex justify-center">
        <UPagination
          v-if="data.meta.total > data.meta.limit"
          v-model="page"
          :page-count="data.meta.limit"
          :total="data.meta.total"
        />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
