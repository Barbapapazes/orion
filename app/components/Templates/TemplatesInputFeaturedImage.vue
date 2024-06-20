<script lang="ts" setup>
const props = defineProps<{
  value: string | undefined
}>()

const emits = defineEmits<{
  fileChange: [File]
}>()

const toast = useToast()

const file = ref<File | null>(null)
const hasImage = computed(() => file.value !== null || props.value !== undefined)

function handleFileChange(files: FileList) {
  if (files.length === 0) {
    file.value = null
    return
  }
  const _file = files[0]
  if (!_file) return

  file.value = _file
  emits('fileChange', _file)

  toast.add({
    icon: PHOTO_ICON,
    title: 'Featured image has been added.',
  })
}

const src = computed(() => {
  if (props.value?.startsWith('blob')) {
    return props.value
  }
  if (props.value)
    return getImageURL(props.value)

  return undefined
})
</script>

<template>
  <img
    :src="src"
    class="absolute inset-0 aspect-[16/9] object-cover object-center rounded-lg"
  >
  <TemplatesInputCard
    class="aspect-[16/9] transition"
    :class="{ 'opacity-0 hover:opacity-80 hover:dark:bg-opacity-80 backdrop-blur-xl': hasImage }"
  >
    <UIcon
      :name="PHOTO_ICON"
      class="inline-block flex-shrink-0 h-8 w-8"
    />
    <p class="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
      <template v-if="!hasImage">
        Featured image
      </template>
      <template v-else>
        Featured image added
      </template>
    </p>
    <p class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
      <template v-if="!hasImage">
        Drag and drop an image
        <br>
        or click to browse
      </template>
      <template v-else>
        Drag and drop an image
        <br>
        or click to change
      </template>
    </p>

    <template #input>
      <UInput
        type="file"
        accept="image/png, image/jpeg, image/webp"
        :ui="{ wrapper: 'absolute inset-0 opacity-0', form: 'h-full w-full cursor-pointer' }"
        @change="handleFileChange"
      />
    </template>
  </TemplatesInputCard>
</template>
