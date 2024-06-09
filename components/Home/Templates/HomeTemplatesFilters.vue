<script lang="ts" setup>
import type { Category } from '~/server/utils/drizzle'
import type { TemplatePaidStatus } from '~/types'

defineProps<{
  templatePaidStatus: typeof TEMPLATE_PAID_STATUS
  categories: Pick<Category, 'slug' | 'name'>[]
  modules: Pick<Module, 'slug' | 'name' | 'icon'>[]
}>()

const categorySlug = defineModel<string>('categorySlug', { required: false })
const moduleSlug = defineModel<string>('moduleSlug', { required: false })
const paidStatus = defineModel<TemplatePaidStatus>('paidStatus', { required: false })
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="h-9 flex flex-row items-center justify-between">
      <p class="text-lg font-semibold">
        Filters
      </p>

      <UButton
        variant="ghost"
        color="gray"
        size="xs"
      >
        Reset
      </UButton>
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-6 md:gap-4">
      <USelectMenu
        v-model="categorySlug"
        :options="categories"
        placeholder="Categories"
        value-attribute="slug"
        option-attribute="name"
        size="md"
      />

      <USelectMenu
        v-model="moduleSlug"
        :options="modules"
        placeholder="Modules"
        value-attribute="slug"
        option-attribute="name"
        size="md"
      >
        <template #option="{ option }">
          <img
            v-if="option.icon"
            :src="`${MODULE_ICON_PREFIX}/${option.icon}`"
            class="h-4 w-auto"
          >
          <span
            v-else
            class="i-heroicons-photo inline-block h-4 w-4"
          />
          <span>{{ option.name }}</span>
        </template>
      </USelectMenu>

      <!-- @vue-expect-error Because Paid Status is readonly, a type error to cast to string[] is thrown -->
      <USelectMenu
        v-model="paidStatus"
        :options="templatePaidStatus"
        placeholder="Pricing"
        size="md"
      >
        <template #option="{ option }">
          <TemplatesPaidStatusBadge :status="option" />
        </template>
      </USelectMenu>
    </div>
  </div>
</template>
