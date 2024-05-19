<script lang="ts" setup>
import { type Category } from '~/server/utils/drizzle'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin'
})

useSeoMeta({
  title: 'Categories'
})

const defaultColumns = [{
  key: 'id',
  label: '#'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'slug',
  label: 'Slug',
}, {
  key: 'actions',
  label: 'Actions'
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const actionsItems = (row: Category) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      editCategory.value = row
      isEditCategoryModalOpen.value = true
    }
  },
]]

const isNewCategoryModalOpen = ref<boolean>(false)

const editCategory = ref<Category | null>(null)
const isEditCategoryModalOpen = ref<boolean>(false)

const { data: categories, refresh, pending } = await useFetch<Category[]>('/api/categories', {
  deep: false,
  lazy: true,
  default: () => []
})

function onFormClose () {
  isNewCategoryModalOpen.value = false
  isEditCategoryModalOpen.value = false
  refresh()
}

defineShortcuts({
  meta_c: {
    handler: () => {
      isNewCategoryModalOpen.value = true
    }
  }
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
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewCategoryModalOpen = true"
          />
          <RefreshButton
            :loading="pending"
            @click="refresh"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardModal
        v-model="isNewCategoryModalOpen"
        title="New category"
        description="Insert a new category into the system"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <CategoriesCreateForm @close="onFormClose()" />
      </UDashboardModal>

      <UDashboardModal
        v-model="isEditCategoryModalOpen"
        title="Edit category"
        description="Be careful with this action, if could affect the system."
        :ui="{ width: 'sm:max-w-md' }"
      >
        <CategoriesEditForm v-if="editCategory" :category="editCategory" @close="onFormClose()" />
      </UDashboardModal>


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

      <UTable :columns="columns" :rows="categories" :loading="pending">
        <template #actions-data="{ row }">
          <UDropdown :items="actionsItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
