<script lang="ts" setup>
import { type Module } from '~~/server/utils/drizzle'
import { handleFetchError } from '~/utils/errors'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

useSeoMeta({
  title: 'Modules',
})

const toast = useToast()

const defaultColumns = [{
  key: 'id',
  label: '#',
}, {
  key: 'icon',
  label: 'Icon',
}, {
  key: 'slug',
  label: 'Slug',
}, {
  key: 'name',
  label: 'Name',
  sortable: true,
}, {
  key: 'type',
  label: 'Type',
  sortable: true,
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

// Do not use the composable to avoid hitting the client cache
const { data: modules, refresh, pending } = await useFetch<Module[]>('/api/modules', {
  deep: false,
  lazy: true,
  default: () => [],
})

const syncModuleLoading = ref<boolean>(false)
async function syncModules() {
  syncModuleLoading.value = true
  try {
    await $fetch('/api/modules/sync', {
      method: 'POST',
    })
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: 'Modules synced',
      color: 'green',
    })
    refresh()
  }
  catch (error) {
    handleFetchError(error)
  }
  finally {
    syncModuleLoading.value = false
  }
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Modules"
        :badge="modules.length"
      >
        <template #right>
          <UButton
            label="Sync"
            :loading="syncModuleLoading"
            color="gray"
            @click="syncModules"
          />
          <AdminRefreshButton
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
        :rows="modules"
        :loading="pending"
      >
        <template #icon-data="{ row }">
          <UAvatar
            :ui="{ background: 'bg-transparent', rounded: '', icon: { size: { sm: 'w-8 h-8' } } }"
            :src="row.icon ? `${MODULE_ICON_PREFIX}/${row.icon}` : ''"
            icon="i-heroicons-photo"
          />
        </template>
        <template #type-data="{ row }">
          <template v-if="row.type === 'official'">
            <UBadge
              color="green"
              variant="subtle"
            >
              Official
            </UBadge>
          </template>
          <template v-else-if="row.type === 'community'">
            <UBadge
              color="blue"
              variant="subtle"
            >
              Community
            </UBadge>
          </template>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
