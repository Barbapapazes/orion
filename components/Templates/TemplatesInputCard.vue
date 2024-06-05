<template>
  <UCard
    class="relative group dark:bg-opacity-20 dark:bg-gray-800"
    :ui="{ body: { base: 'flex h-full', padding: 'px-0 py-0 sm:p-0' }, ring: 'ring-0 border border-dashed hover:border-solid border-gray-200 dark:border-gray-800' }"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <slot />
    </div>

    <slot name="input" />
  </UCard>
</template>
