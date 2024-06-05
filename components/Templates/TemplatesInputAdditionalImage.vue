<script lang="ts" setup>
const props = defineProps<{
  file: File
}>()

const emits = defineEmits<{
  click: [File]
}>()

function onClick() {
  emits('click', props.file)
}
</script>

<template>
  <div
    class="relative group flex justify-center items-center rounded-xl overflow-hidden"
    type="button"
  >
    <img
      :src="urlFromFile(file)"
      alt="Image preview"
      class="absolute inset-0 aspect-[16/9] object-cover object-center"
    >
    <div class="aspect-[16/9] h-full w-full relative opacity-0 dark:bg-gray-800 transition group-hover:opacity-100 group-hover:dark:bg-opacity-60 backdrop-blur flex justify-center items-center">
      <UButton
        variant="outline"
        size="sm"
        color="red"
        icon="i-heroicons-trash"
        @click="onClick()"
      >
        Remove
      </UButton>
    </div>
  </div>
</template>
