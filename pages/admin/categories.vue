<script lang="ts" setup>
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
}]
const selectedColumns = ref(defaultColumns)
const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

const isNewCategoryModalOpen = ref<boolean>(false)

const { data: categories, refresh, pending } = await useFetch('/api/categories', {
  deep: false,
})

function onFormClose () {
  isNewCategoryModalOpen.value = false
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
        <CategoriesForm @close="onFormClose()" />
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

      <UTable :columns="columns" :rows="categories" :loading="pending" />
    </UDashboardPanel>
  </UDashboardPage>
</template>
