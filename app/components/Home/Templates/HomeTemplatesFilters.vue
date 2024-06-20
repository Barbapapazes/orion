<script lang="ts" setup>
import type { Category } from '~~/server/utils/drizzle'
import type { TemplatePaidStatus } from '~~/types'
import type { TemplatePaidStatusOption } from '~/utils'

const props = defineProps<{
  templatePaidStatus: TemplatePaidStatusOption[]
  categories: Pick<Category, 'slug' | 'name'>[]
  modules: Pick<Module, 'slug' | 'name' | 'icon'>[]
}>()

const emits = defineEmits<{
  reset: []
}>()

function onClickReset() {
  emits('reset')
}

const categorySlug = defineModel<string>('categorySlug', { required: false })
const moduleSlug = defineModel<string>('moduleSlug', { required: false })
const paidStatus = defineModel<TemplatePaidStatus>('paidStatus', { required: false })

const showResetFilters = computed(() => {
  return categorySlug.value || moduleSlug.value || paidStatus.value
})

const categoriesOptions = [
  { slug: undefined, name: 'All' },
  ...props.categories,
]

const modulesOptions = [
  { slug: undefined, name: 'All', icon: PHOTO_ICON },
  ...props.modules,
]

const paidStatusOptions = [
  { value: undefined, label: 'All' },
  ...props.templatePaidStatus,
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="h-9 flex flex-row items-center justify-between">
      <p class="text-lg font-semibold">
        Filters
      </p>

      <UButton
        v-if="showResetFilters"
        variant="ghost"
        color="gray"
        size="xs"
        @click="onClickReset()"
      >
        Reset
      </UButton>
    </div>

    <div class="flex flex-col gap-6 md:gap-4">
      <USelectMenu
        v-model="categorySlug"
        :options="categoriesOptions"
        placeholder="Categories"
        value-attribute="slug"
        option-attribute="name"
        size="md"
      />

      <USelectMenu
        v-model="moduleSlug"
        :options="modulesOptions"
        placeholder="Modules"
        value-attribute="slug"
        option-attribute="name"
        size="md"
      >
        <template #option="{ option }">
          <UAvatar
            :src="`${MODULE_ICON_PREFIX}/${option.icon}`"
            :icon="PHOTO_ICON"
            :ui="{ rounded: '', icon: { size: { '3xs': 'h-4 w-4' } }, background: '' }"
            size="3xs"
          />
          <span>{{ option.name }}</span>
        </template>
      </USelectMenu>

      <USelectMenu
        v-model="paidStatus"
        :options="paidStatusOptions"
        placeholder="Pricing"
        size="md"
        value-attribute="value"
        option-attribute="label"
      >
        <template #option="{ option }">
          <TemplatesPaidStatusBadge
            v-if="option.value"
            :status="option.value"
          />
          <span v-else>{{ option.label }}</span>
        </template>
      </USelectMenu>
    </div>
  </div>
</template>
