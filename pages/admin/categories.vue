<script lang="ts" setup>
import { type Category } from '~/types'

definePageMeta({
  layout: 'admin'
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
  key: 'actions'
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

const { data: categories, refresh, pending } = await useFetch('/api/categories', {
  deep: false,
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
      >
        <template #right>
          <UButton
            label="New category"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewCategoryModalOpen = true"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardModal
        v-model="isNewCategoryModalOpen"
        title="New category"
        description="Add a new category to your database"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <CategoriesCreateForm @close="onFormClose()" />
      </UDashboardModal>

      <UDashboardModal
        v-model="isEditCategoryModalOpen"
        title="Edit category"
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
