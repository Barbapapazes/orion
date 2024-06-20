<script lang="ts" setup>
import type { User } from '~~/server/utils/drizzle'
import type { DropdownItem } from '#ui/types'
// see https://github.com/nuxt/ui/issues/1878
// import type { Column } from '#ui/types'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

defineProps<{
  columns: Column[]
  users: Pick<User, 'id' | 'login' | 'name' | 'email' | 'avatarUrl' | 'roleType'>[]
  pending: boolean
}>()

const emits = defineEmits<{
  refresh: []
}>()

const sort = defineModel<{ column: string, direction: 'asc' | 'desc' }>('sort', { required: true })

const actionsItems = (row: User) => {
  const actions: DropdownItem[] = [
    {
      label: 'Copy Email',
      icon: CLIPBOARD_ICON,
      click: () => useCopy(row.email),
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
        icon: UNLOCK_ICON,
        click: async () => {
          try {
            await $fetch(`/api/users/${row.id}/unban`, {
              method: 'PATCH',
            })
            useSuccessToast(`User "${row.login}" has been unbanned`)
            emits('refresh')
          }
          catch (error) {
            handleFetchError(error)
          }
        },
      }]]
  }

  return [
    actions,
    [{
      label: 'Ban',
      icon: LOCK_ICON,
      click: async () => {
        try {
          await $fetch(`/api/users/${row.id}/ban`, {
            method: 'PATCH',
          })
          useSuccessToast(`User "${row.login}" has been banned`)
          emits('refresh')
        }
        catch (error) {
          handleFetchError(error)
        }
      },
    }]]
}
</script>

<template>
  <UTable
    v-model:sort="sort"
    :columns="columns"
    :rows="users"
    :loading="pending"
    sort-mode="manual"
  >
    <template #login-data="{ row }">
      <UButton
        :to="`https://github.com/${row.login}`"
        color="gray"
        variant="ghost"
        target="_blank"
      >
        <UAvatar
          :src="row.avatarUrl"
          :alt="`${row.login} avatar`"
          size="xs"
        />
        <span>{{ row.login }}</span>
      </UButton>
    </template>
    <template #email-data="{ row }">
      <UButton
        v-if="row.email"
        color="gray"
        variant="ghost"
        @click="useCopy(row.email)"
      >
        {{ row.email }}
      </UButton>
    </template>
    <template #name-data="{ row }">
      {{ row.name ?? '-' }}
    </template>
    <template #roleType-data="{ row }">
      <AdminUserRoleTypeBadge :role-type="row.roleType" />
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="actionsItems(row)">
        <UButton
          color="gray"
          variant="ghost"
          :icon="MORE_VERTICAL_ICON"
        />
      </UDropdown>
    </template>
  </UTable>
</template>
