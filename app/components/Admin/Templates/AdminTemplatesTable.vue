<script lang="ts" setup>
import type { DropdownItem } from '#ui/types'
import type { Template as _Template } from '~~/server/utils/drizzle'
import type { TemplatePaidStatus, TemplateStatus } from '~~/types'
// see https://github.com/nuxt/ui/issues/1878
// import type { Column } from '#ui/types'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Template {
  id: number
  title: string
  slug: string
  hash: string
  liveUrl: string | null
  accessUrl: string
  status: TemplateStatus
  paidStatus: TemplatePaidStatus
  updatedAt: string
  creator: {
    login: string
    name: string | null
    email: string
    avatarUrl: string
  }
  category: {
    slug: string
    name: string
  }
}

defineProps<{
  columns: Column[]
  templates: Template[]
  pending: boolean
}>()

const emits = defineEmits<{
  refresh: []
}>()

const sort = defineModel<{ column: string, direction: 'asc' | 'desc' }>('sort', { required: true })

const actionsItems = (row: Template) => {
  const actions: DropdownItem[][] = [[
    {
      label: 'View',
      icon: EYE_ICON,
      to: generateShowTemplateURL({
        categorySlug: row.category.slug,
        slug: row.slug,
        hash: row.hash,
      }),
      target: '_blank',
    },
  ], [{
    label: 'Copy Title',
    icon: CLIPBOARD_ICON,
    click: () => useCopy(row.title),
  },
  {
    label: 'Copy Creator Name',
    icon: CLIPBOARD_ICON,
    click: () => useCopy(row.creator.name ?? row.creator.login),
  },
  {
    label: 'Copy Creator Email',
    icon: CLIPBOARD_ICON,
    click: () => useCopy(row.creator.email),
  },
  ]]

  function updateStatus(status: TemplateStatus) {
    return async () => {
      try {
        await $fetch(`/api/templates/${row.hash}/status`, {
          method: 'PATCH',
          body: { status },
        })

        useSuccessToast(`Template "${row.title}" has been ${status}`)
        emits('refresh')
      }
      catch (error) {
        handleFetchError(error)
      }
    }
  }

  const validatedAction = {
    label: 'Validated',
    icon: CHECK_CIRCLE_ICON,
    click: updateStatus('validated'),
  }

  const reviewAction = {
    label: 'Reviewed',
    icon: EYE_ICON,
    click: updateStatus('reviewed'),
  }

  const refusedAction = {
    label: 'Refused',
    icon: X_CIRCLE_ICON,
    click: updateStatus('refused'),
  }

  if (row.status === 'submitted') {
    actions.push([validatedAction, reviewAction, refusedAction])
  }
  else if (row.status === 'validated') {
    actions.push([reviewAction, refusedAction])
  }
  else if (row.status === 'reviewed') {
    actions.push([validatedAction, refusedAction])
  }
  else if (row.status === 'refused') {
    actions.push([validatedAction, reviewAction])
  }

  return actions
}
</script>

<template>
  <UTable
    v-model:sort="sort"
    :columns="columns"
    :rows="templates"
    :loading="pending"
    sort-mode="manual"
  >
    <template #title-data="{ row }">
      <UButton
        target="_blank"
        variant="ghost"
        color="gray"
        :to="generateShowTemplateURL({
          categorySlug: row.category.slug,
          slug: row.slug,
          hash: row.hash,
        })"
        :label="row.title"
      />
    </template>
    <template #liveUrl-data="{ row }">
      <UButton
        v-if="row.liveUrl"
        variant="link"
        target="_blank"
        :to="row.liveUrl"
        class="flex flex-row items-center gap-1"
      >
        <span>{{ row.liveUrl }}</span>

        <span class="inline-block w-4 h-4" :class="EXTERNAL_LINK_ICON" />
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

        <span class="inline-block w-4 h-4" :class="EXTERNAL_LINK_ICON" />
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
        variant="ghost"
        size="xs"
      >
        <template #leading>
          <UAvatar
            :src="row.creator.avatarUrl"
            :alt="`${row.creator.name ?? row.creator.login} avatar`"
            size="2xs"
          />
        </template>
      </UButton>
    </template>
    <template #category-data="{ row }">
      {{ row.category.name }}
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
