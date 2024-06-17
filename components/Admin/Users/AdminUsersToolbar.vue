<script lang="ts" setup>
import type { UserRoleType } from '~/types'
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
const roleType = defineModel<UserRoleType>('roleType')
const selectedColumns = defineModel<Column[]>('selectedColumns')

const roleTypeOptions = [
  {
    label: 'All',
    value: undefined,
  },
  ...userRoleTypeOptions,
]
</script>

<template>
  <UDashboardToolbar>
    <template #left>
      <UInput
        v-model="search"
        placeholder="Search"
      />
      <USelectMenu
        v-model="roleType"
        placeholder="Role Type"
        :options="roleTypeOptions"
        value-attribute="value"
      />
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
