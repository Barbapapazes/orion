<template>
  <UButton
    :icon="LOAD_ICON"
    class="opacity-60 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 transition"
    :ui="{ color: { gray: { ghost: 'hover:bg-transparent dark:hover:bg-transparent' } } }"
    size="sm"
    variant="ghost"
    color="gray"
    square
    title="Refresh"
  />
</template>
