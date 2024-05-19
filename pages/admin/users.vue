<script lang="ts" setup>
import type { User } from '~/server/utils/drizzle';

definePageMeta({
  middleware: ['admin'],
  layout: 'admin'
})

useSeoMeta({
  title: 'Users'
})

const defaultColumns = [{
  key: 'id',
  label: '#'
}, {
  key: 'githubId',
  label: 'GitHub ID',
}, {
  key: 'login',
  label: 'Login',
  sortable: true
}, {
  key: 'name',
  label: 'Name',
  sortable: true
},{
  key: 'email',
  label: 'Email',
  sortable: true
},{
  key: 'roleType',
  label: 'Role Type'
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const { data: users, pending, refresh } = await useFetch<User[]>('/api/users', {
  deep: false,
  lazy: true,
  default: () => []
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Users"
        :badge="users.length"
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

      <UTable :columns="columns" :rows="users" :loading="pending">
        <template #login-data="{ row }">
          <div class="flex flex-row items-center gap-2">
          <img :src="row.avatarUrl" alt="avatar" class="w-6 h-6 rounded-full">
          <span>{{ row.login }}</span>
          </div>
        </template>
        <template #roleType-data="{ row }">
          <UBadge variant="subtle" :color="row.roleType === 'admin' ? 'amber' : 'primary'">{{ row.roleType }}</UBadge>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
