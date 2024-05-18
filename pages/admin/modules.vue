<script lang="ts" setup>
import { type Module } from '~/server/utils/drizzle'

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
  label: '#'
}, {
  key: 'icon',
  label: 'Icon',
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'type',
  label: 'Type',
  sortable: true
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const { data: modules, refresh, pending } = await useFetch<Module[]>('/api/modules', {
  deep: false,
  lazy: true,
  default: () => []
})

const fetchModuleLoading = ref<boolean>(false)
async function fetchModules() {
  fetchModuleLoading.value = true
   try {
    await $fetch('/api/modules/fetch', {
      method: 'POST',
    })
    toast.add({
      icon: "i-heroicons-check-circle",
      title: 'Modules fetched',
      color: 'green',
    })
    refresh()
   }
  catch (e) {
    if (e instanceof Error) {
          console.error(e)
          toast.add({
            icon: "i-heroicons-exclamation-circle",
            title: 'Something went wrong',
            description: e.message,
            color: 'red',
          })
        }
      } finally {
        fetchModuleLoading.value = false
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
            label="Fetch modules"
            :loading="fetchModuleLoading"
            trailing-icon="i-heroicons-server-stack"
            color="gray"
            @click="fetchModules"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
              <template #left>
         <UButton
            label="Refresh"
            trailing-icon="i-heroicons-arrow-path"
            color="gray"
            @click="refresh"
          />
      </template>
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

        <UTable :columns="columns" :rows="modules" :loading="pending">
          <template #icon-data="{ row }">
            <img v-if="row.icon" :src="`https://ipx.nuxt.com/s_80,f_auto/gh/nuxt/modules/main/icons/${row.icon}`" class="h-6 w-auto" />
            <span v-else class="i-heroicons-photo inline-block h-6 w-6" />
          </template>
          <template #type-data="{ row }">
          <UBadge variant="subtle" :color="row.type === 'official' ? 'green' : 'blue'">{{ row.type }}</UBadge>
        </template>
        </UTable>
      </UDashboardPanel>
    </UDashboardPage>
</template>
