<script lang="ts" setup>
import type { Category } from '~~/server/utils/drizzle'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})

useSeoMeta({
  title: 'Categories',
})

const defaultColumns = [{
  key: 'id',
  label: '#',
}, {
  key: 'name',
  label: 'Name',
  sortable: true,
}, {
  key: 'slug',
  label: 'Slug',
}, {
  key: 'actions',
  label: 'Actions',
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const actionsItems = (row: Category) => [
  [{
    label: 'Edit',
    icon: EDIT_ICON,
    click: () => {
      editCategory.value = row
      isEditCategoryModalOpen.value = true
    },
  },
  ]]

const isNewCategoryModalOpen = ref<boolean>(false)

const editCategory = ref<Category | null>(null)
const isEditCategoryModalOpen = ref<boolean>(false)

// Do not use the composable to avoid hitting the client cache
const { data: categories, refresh, pending } = await useFetch<Category[]>('/api/categories', {
  deep: false,
  lazy: true,
  default: () => [],
})

defineShortcuts({
  meta_c: {
    handler: () => {
      isNewCategoryModalOpen.value = true
    },
  },
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Categories"
        :badge="categories.length"
      >
        <template #right>
          <UButton
            label="New category"
            :trailing-icon="PLUS_ICON"
            color="gray"
            @click="isNewCategoryModalOpen = true"
          />
          <AdminRefreshButton
            :loading="pending"
            @click="refresh"
          />
        </template>
      </UDashboardNavbar>

      <AdminCategoriesCreateModal
        v-model:open="isNewCategoryModalOpen"
        @created="refresh"
      />

      <AdminCategoriesEditModal
        v-if="editCategory?.id"
        :id="editCategory.id"
        v-model:open="isEditCategoryModalOpen"
        :state="editCategory"
        @edited="refresh"
      />

      <UDashboardToolbar>
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            :icon="PHOTO_ICON"
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
        :rows="categories"
        :loading="pending"
      >
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
    </UDashboardPanel>
  </UDashboardPage>
</template>
