<script lang="ts" setup>
defineProps<{
  value: number
}>()
</script>

<template>
  <p class="flex flex-col gap-4 max-w-56">
    <span class="text-4xl md:text-5xl font-semibold"> {{ value }} </span>
    <span class="dark:text-gray-400">
      <slot />
    </span>
  </p>
</template>
