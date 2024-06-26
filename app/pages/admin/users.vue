<script lang="ts" setup>
import type { UserRoleType } from '~/types'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

const defaultColumns = [{
  key: 'id',
  label: '#',
}, {
  key: 'githubId',
  label: 'GitHub ID',
}, {
  key: 'login',
  label: 'Login',
  sortable: true,
}, {
  key: 'name',
  label: 'Name',
  sortable: true,
}, {
  key: 'email',
  label: 'Email',
  sortable: true,
}, {
  key: 'roleType',
  label: 'Role Type',
}, {
  key: 'actions',
  label: 'Actions',
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const page = ref(1)
const sort = ref({ column: 'login', direction: 'asc' as const })
const order = computed(() => sort.value.direction)
const orderBy = computed(() => sort.value.column)

const search = ref<string | undefined>(undefined)
const searchDebounced = useDebounce(search, 300)
const roleType = ref<UserRoleType | undefined>(undefined)

const { data, refresh, pending } = await useFetch('/api/users',
  {
    query: {
      page,
      order,
      orderBy,
      search: searchDebounced,
      roleType,
    },
    deep: false,
    lazy: true,
    default: () => emptyPagination,
  })

const meta = computed(() => data.value.meta)
const limit = computed(() => meta.value.limit)
const total = computed(() => meta.value.total)
const hasMoreUsers = computed(() => total.value > limit.value)

const users = computed(() => data.value.data)

useSeoMeta({
  title: 'Users',
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Users"
        :badge="total"
      >
        <template #right>
          <AdminRefreshButton
            :loading="pending"
            @click="refresh"
          />
        </template>
      </UDashboardNavbar>

      <AdminUsersToolbar
        v-model:search="search"
        v-model:roleType="roleType"
        v-model:selectedColumns="selectedColumns"
        :columns="defaultColumns"
      />

      <AdminUsersTable
        v-model:sort="sort"
        :users="users"
        :columns="columns"
        :pending="pending"
        @refresh="refresh"
      />

      <div
        v-if="hasMoreUsers"
        class="mt-8 flex justify-center"
      >
        <UPagination
          v-model="page"
          :page-count="limit"
          :total="total"
        />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
