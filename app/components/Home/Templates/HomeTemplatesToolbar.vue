<script lang="ts" setup>
import type { TemplateOrderBy } from '~/types'

const search = defineModel<string>('search')
const order = defineModel<'desc' | 'asc'>('order')
const orderBy = defineModel<TemplateOrderBy>('orderBy')
</script>

<template>
  <div class="flex flex-row justify-between gap-4">
    <UInput
      v-model="search"
      icon="i-heroicons-magnifying-glass-20-solid"
      color="white"
      :trailing="false"
      placeholder="Search..."
      size="md"
    />

    <UButtonGroup size="md">
      <UButton
        :icon="order === 'asc' ? 'i-heroicons-bars-arrow-up' : 'i-heroicons-bars-arrow-down'"
        color="gray"
        @click="order = order === 'asc' ? 'desc' : 'asc'"
      />
      <USelectMenu
        v-model="orderBy"
        :options="templateSortOptions"
        color="white"
        class="w-32"
        value-attribute="value"
        option-attribute="label"
      />
    </UButtonGroup>
  </div>
</template>
