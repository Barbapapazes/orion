<script lang="ts" setup>
definePageMeta({
  middleware: ['admin'],
  layout: 'admin'
})

const defaultColumns = [{
  key: 'id',
  label: '#'
}, {
  key: 'githubId',
  label: 'GitHub ID',
}, {
  key: 'username',
  label: 'Username',
  sortable: true
}, {
  key: 'roleType',
  label: 'Role Type'
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const { data: users } = await useFetch('/api/users', {
  deep: false,
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Users"
        :badge="users.length"
      >
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

      <UTable :columns="columns" :rows="users">
        <template #roleType-data="{ row }">
          <UBadge variant="subtle" :color="row.roleType === 'admin' ? 'amber' : 'primary'">{{ row.roleType }}</UBadge>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
