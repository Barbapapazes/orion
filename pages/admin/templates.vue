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

const { data: templates, refresh, pending } = await useFetch('/api/templates', {
  deep: false,
  lazy: true,
  default: () => [],
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Templates"
        :badge="templates.length"
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
        :rows="templates"
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
          <template v-if="row.paidStatus === 'free'">
            <UBadge
              color="green"
              variant="subtle"
            >
              Free
            </UBadge>
          </template>
          <template v-else-if="row.paidStatus === 'paid'">
            <UBadge
              color="yellow"
              variant="subtle"
            >
              Paid
            </UBadge>
          </template>
        </template>
        <template #createdBy-data="{ row }">
          <div class="flex flex-row items-center gap-2">
            <img
              :src="row.user.avatarUrl"
              alt="avatar"
              class="w-6 h-6 rounded-full"
            >
            <span>{{ row.user.name ?? row.user.login }}</span>
          </div>
        </template>
        <template #category-data="{ row }">
          {{ row.category.name }}
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
