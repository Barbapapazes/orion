<template>
  <UCard
    class="relative group dark:bg-opacity-20 dark:bg-gray-800"
    :ui="{ body: { base: 'flex h-full', padding: 'px-0 py-0 sm:p-0' }, ring: 'focus-within:ring-2 focus-within:dark:ring-primary-400' }"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <slot />
    </div>

    <slot name="input" />
  </UCard>
</template>
