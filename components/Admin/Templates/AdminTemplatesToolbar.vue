<script lang="ts" setup>
import type { TemplatePaidStatus, TemplateStatus } from '~/types'
// see https://github.com/nuxt/ui/issues/1878
// import type { Column } from '#ui/types'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

defineProps<{
  columns: Column[]
}>()

const search = defineModel<string>('search')
const status = defineModel<TemplateStatus | undefined>('status')
const paidStatus = defineModel<TemplatePaidStatus | undefined>('paidStatus')
const creator = defineModel<Pick<User, 'id' | 'login' | 'name' | 'avatarUrl'> | undefined>('creator')
const selectedColumns = defineModel<Column[]>('selectedColumns')

const statusOptions = [
  {
    label: 'All',
    value: undefined,
  },
  ...templateStatusOptions,
]

const paidStatusOptions = [
  {
    label: 'All',
    value: undefined,
  },
  ...templatePaidStatusOptions,
]

const loading = ref(false)
const searchCreator = async (query: string) => {
  loading.value = true
  try {
    const response = await $fetch('/api/users', {
      query: {
        page: 1,
        limit: 5,
        order: 'asc',
        orderBy: 'login',
        search: query,
      },
    })
    const data = response.data

    if (!query) {
      return [
        {
          id: undefined,
          login: 'All',
        },
        ...data,
      ]
    }

    return data
  }
  catch (error) {
    handleFetchError(error)
  }
  finally {
    loading.value = false
  }
  return []
}
</script>

<template>
  <UDashboardToolbar :ui="{ container: 'flex-col md:flex-row gap-1.5 items-start md:items-center', left: 'w-full grid grid-cols-2 md:flex', right: 'w-full md:w-auto justify-end' }">
    <template #left>
      <UInput
        v-model="search"
        placeholder="Search"
      />
      <USelectMenu
        v-model="status"
        placeholder="Status"
        :options="statusOptions"
        value-attribute="value"
      />
      <USelectMenu
        v-model="paidStatus"
        placeholder="Paid Status"
        :options="paidStatusOptions"
        value-attribute="value"
      />
      <USelectMenu
        v-model="creator"
        class="min-w-32"
        :searchable="searchCreator"
        :loading="loading"
        placeholder="Creator..."
        trailing
        clear-search-on-close
      >
        <template #label>
          <span
            v-if="creator && creator.id"
            class="truncate"
          >{{ creator.name ?? creator.login }}</span>
          <span v-else>Creator</span>
        </template>
        <template #option="{ option }">
          <UAvatar
            v-if="option.avatarUrl"
            :src="option.avatarUrl"
            size="2xs"
          />
          <span class="truncate">{{ option.name ?? option.login }}</span>
        </template>
        <template
          v-if="creator && creator.id"
          #leading
        >
          <UAvatar
            :src="creator.avatarUrl"
            size="2xs"
          />
        </template>
      </USelectMenu>
    </template>
    <template #right>
      <USelectMenu
        v-model="selectedColumns"
        icon="i-heroicons-adjustments-horizontal-solid"
        :options="columns"
        multiple
      >
        <template #label>
          Display
        </template>
      </USelectMenu>
    </template>
  </UDashboardToolbar>
</template>
