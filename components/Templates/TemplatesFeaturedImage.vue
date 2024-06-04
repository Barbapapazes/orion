<script lang="ts" setup>

</script>

<template>
  <UFormGroup
    label="Featured image"
    help="This image will be displayed on the template list page and on the template page."
    hint="Maximum size: 1920x1080px, and 500kB"
    :ui="{ container: 'aspect-[16/9]' }"
    required
  >
    <UCard
      class="h-full relative group dark:bg-opacity-20 dark:bg-gray-800"
      :ui="{ body: { base: 'flex h-full', padding: 'px-0 py-0 sm:p-0' }, ring: 'ring-0 border border-dashed hover:border-solid border-gray-200 dark:border-gray-800' }"
    >
      <div class="w-full flex flex-col justify-center items-center">
        <UIcon
          name="i-heroicons-document-arrow-up"
          class="inline-block flex-shrink-0 h-8 w-8"
        />
        <p class="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
          Featured image
        </p>
        <p class="mt-2 text-center text-sm dark:text-gray-400">
          Drag and drop an image
          <br>
          or click to browse
        </p>
      </div>
      <UInput
        type="file"
        accept="image/*"
        :ui="{ wrapper: 'absolute inset-0 opacity-0', form: 'h-full w-full cursor-pointer' }"
      />
    </UCard>
  </UFormGroup>
</template>
