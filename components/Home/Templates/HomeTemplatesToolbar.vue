<script lang="ts" setup>
import type { TemplateSort } from '~/types'

const search = defineModel<string>('search', { required: true })

const order = defineModel<-1 | 1>('order', { required: true })
const sort = defineModel<TemplateSort>('sort', { required: true })
</script>

<template>
  <div class="flex flex-row justify-between">
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
        :icon="order === 1 ? 'i-heroicons-bars-arrow-up' : 'i-heroicons-bars-arrow-down'"
        color="gray"
        @click="order *= -1"
      />
      <USelectMenu
        v-model="sort"
        :options="templateSortOptions"
        color="white"
        class="w-32"
      />
    </UButtonGroup>
  </div>
</template>
