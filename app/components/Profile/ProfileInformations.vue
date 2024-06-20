<script lang="ts" setup>
defineProps<{
  avatarUrl: string
  name: string
  email: string
}>()
</script>

<template>
  <UCard
    class="bg-opacity-20 bg-gray-200 dark:bg-opacity-20 dark:bg-gray-800"
    :ui="{ body: { base: 'flex flex-row items-center gap-4' } }"
  >
    <UAvatar
      :src="avatarUrl"
      :alt="`${name} avatar`"
      size="lg"
    />
    <div class="flex flex-col">
      <p class="font-semibold">
        {{ name }}
      </p>
      <p
        class="text-gray-500 dark:text-gray-400 text-sm truncate"
        :title="email"
      >
        {{ email }}
      </p>
    </div>
  </UCard>
</template>
