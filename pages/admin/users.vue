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

const search = ref<string | undefined>(undefined)
const searchDebounced = useDebounce(search, 300)
const roleType = ref<UserRoleType | undefined>(undefined)

const { data, pending, refresh } = await useAsyncData(() => useRequestFetch()('/api/users', {
  query: {
    page: page.value,
    roleType: roleType.value,
    order: sort.value.direction,
    orderBy: sort.value.column,
    search: search.value,
  },
}), {
  deep: false,
  lazy: true,
  default: () => emptyPagination,
  watch: [page, sort, searchDebounced, roleType],
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
        :columns="columns"
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
