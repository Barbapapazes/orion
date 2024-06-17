<script lang="ts" setup>
// see https://github.com/nuxt/ui/issues/1878
// import type { Column } from '#ui/types'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

defineProps<{
  columns: Column[]
  templates: object[]
  pending: boolean
}>()

const emits = defineEmits<{
  refresh: []
}>()

const sort = defineModel<{ column: string, direction: 'asc' | 'desc' }>('sort', { required: true })

const toast = useToast()
</script>

<template>
  <UTable
    v-model:sort="sort"
    :columns="columns"
    :rows="templates"
    :loading="pending"
    sort-mode="manual"
  >
    <template #liveUrl-data="{ row }">
      <UButton
        v-if="row.liveUrl"
        variant="link"
        target="_blank"
        :to="row.liveUrl"
        class="flex flex-row items-center gap-1"
      >
        <span>{{ row.liveUrl }}</span>

        <span class="i-heroicons-arrow-top-right-on-square-16-solid inline-block w-4 h-4" />
      </UButton>
      <span v-else> - </span>
    </template>
    <template #accessUrl-data="{ row }">
      <UButton
        variant="link"
        target="_blank"
        :to="row.accessUrl"
        class="flex flex-row items-center gap-1"
      >
        <span>{{ row.accessUrl }}</span>

        <span class="i-heroicons-arrow-top-right-on-square-16-solid inline-block w-4 h-4" />
      </UButton>
    </template>
    <template #status-data="{ row }">
      <TemplatesStatusBadge :status="row.status" />
    </template>
    <template #paidStatus-data="{ row }">
      <TemplatesPaidStatusBadge :status="row.paidStatus" />
    </template>
    <template #createdBy-data="{ row }">
      <UButton
        :to="`https://github.com/${row.creator.login}`"
        rel="noopener noreferrer external"
        :label="row.creator.name ?? row.creator.login"
        color="gray"
        target="_blank"
      >
        <template #leading>
          <UAvatar
            :src="row.creator.avatarUrl"
            :alt="`${row.creator.name ?? row.creator.login} avatar`"
            size="xs"
          />
        </template>
      </UButton>
    </template>
    <template #category-data="{ row }">
      {{ row.category.name }}
    </template>
    <template #description-data="{ row }">
      <div
        v-html="row.description"
      />
    </template>
  </UTable>
</template>
