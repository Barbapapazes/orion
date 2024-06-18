<script lang="ts" setup>
const emits = defineEmits<{
  resetFilters: []
}>()

function onClick() {
  emits('resetFilters')
}
</script>

<template>
  <UCard
    class="dark:bg-opacity-20 dark:bg-gray-800 py-40"
    :ui="{ body: { base: 'flex flex-col justify-center items-center gap-6' } }"
  >
    <p class="text-sm text-center dark:text-gray-400">
      No templates found.
    </p>
    <div class="flex flex-row justify-center items-center gap-2">
      <SubmitTemplateButton
        size="sm"
      />
      <UButton
        type="button"
        variant="ghost"
        color="gray"
        @click="onClick"
      >
        Reset filters
      </UButton>
    </div>
  </UCard>
</template>
