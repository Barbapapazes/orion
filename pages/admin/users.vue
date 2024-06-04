<script lang="ts" setup>
import type { User } from '~/server/utils/drizzle'
import type { Dropdown } from '#ui/types'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

useSeoMeta({
  title: 'Users',
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

const toast = useToast()

function copy(text: string) {
  navigator.clipboard.writeText(text)
  toast.add({
    icon: 'i-heroicons-check-circle',
    title: 'Copied',
    color: 'green',
  })
}

const actionsItems = (row: User) => {
  const actions: Dropdown = [
    {
      label: 'Copy Email',
      icon: 'i-heroicons-clipboard',
      click: () => copy(row.email),
    },
  ]

  if (row.roleType === 'admin') {
    return [actions]
  }

  if (row.roleType === 'banned') {
    return [
      actions,
      [{
        label: 'Unban',
        icon: 'i-heroicons-lock-open',
        click: async () => {
          try {
            await $fetch(`/api/users/${row.id}/unban`, {
              method: 'PATCH',
            })
            toast.add({
              icon: 'i-heroicons-check-circle',
              title: `User "${row.login}" has been unbanned`,
              color: 'green',
            })
            await refresh()
          }
          catch (error) {
            if (error instanceof Error) {
              console.error(error)
              toast.add({
                icon: 'i-heroicons-exclamation-circle',
                title: 'Something went wrong',
                description: error.message,
                color: 'red',
              })
            }
          }
        },
      }]]
  }

  return [
    actions,
    [{
      label: 'Ban',
      icon: 'i-heroicons-lock-closed',
      click: async () => {
        try {
          await $fetch(`/api/users/${row.id}/ban`, {
            method: 'PATCH',
          })
          toast.add({
            icon: 'i-heroicons-check-circle',
            title: `User "${row.login}" has been banned`,
            color: 'green',
          })
          await refresh()
        }
        catch (error) {
          if (error instanceof Error) {
            console.error(error)
            toast.add({
              icon: 'i-heroicons-exclamation-circle',
              title: 'Something went wrong',
              description: error.message,
              color: 'red',
            })
          }
        }
      },
    }]]
}

const page = ref(1)

const { data, pending, refresh } = await useFetch('/api/users', {
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
        title="Users"
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
        <template #login-data="{ row }">
          <UButton
            :to="`https://github.com/${row.login}`"
            color="gray"
            variant="ghost"
            target="_blank"
          >
            <img
              :src="row.avatarUrl"
              alt="avatar"
              class="w-6 h-6 rounded-full"
            >
            <span>{{ row.login }}</span>
          </UButton>
        </template>
        <template #email-data="{ row }">
          <UButton
            v-if="row.email"
            color="gray"
            variant="ghost"
            @click="copy(row.email)"
          >
            {{ row.email }}
          </UButton>
        </template>
        <template #name-data="{ row }">
          {{ row.name ?? '-' }}
        </template>
        <template #roleType-data="{ row }">
          <template v-if="row.roleType === 'admin'">
            <UBadge
              color="red"
              variant="subtle"
            >
              Admin
            </UBadge>
          </template>
          <template v-else-if="row.roleType === 'creator'">
            <UBadge
              color="green"
              variant="subtle"
            >
              User
            </UBadge>
          </template>
          <template v-else-if="row.roleType === 'banned'">
            <UBadge
              color="orange"
              variant="subtle"
            >
              Banned
            </UBadge>
          </template>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="actionsItems(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
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
