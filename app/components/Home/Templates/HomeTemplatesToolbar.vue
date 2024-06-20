<script lang="ts" setup>
import type { TemplateOrderBy } from '~~/types'

const search = defineModel<string>('search')
const order = defineModel<'desc' | 'asc'>('order')
const orderBy = defineModel<TemplateOrderBy>('orderBy')
</script>

<template>
  <div class="flex flex-row justify-between gap-4">
    <UInput
      v-model="search"
      :icon="SEARCH_ICON"
      color="white"
      :trailing="false"
      placeholder="Search..."
      size="md"
    />

    <UButtonGroup size="md">
      <UButton
        :icon="order === 'asc' ? SORT_ASC_ICON : SORT_DESC_ICON"
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
