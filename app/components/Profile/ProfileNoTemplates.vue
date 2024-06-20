<script lang="ts" setup>
const emits = defineEmits<{
  info: []
}>()

function onClick() {
  emits('info')
}
</script>

<template>
  <UCard
    class="bg-opacity-20 bg-gray-200 dark:bg-opacity-20 dark:bg-gray-800 py-40"
    :ui="{ body: { base: 'h-full flex flex-col justify-center items-center gap-6' } }"
  >
    <p class="text-sm text-center text-gray-500 dark:text-gray-400">
      No templates found.
    </p>
    <div class="flex flex-row justify-center items-center gap-2">
      <UButton
        to="/templates/new"
        color="black"
      >
        Submit a template
      </UButton>
      <UTooltip text="Explanation">
        <UButton
          square
          :icon="INFORMATION_CIRCLE_ICON"
          color="gray"
          variant="ghost"
          @click="onClick"
        />
      </UTooltip>
    </div>
  </UCard>
</template>
