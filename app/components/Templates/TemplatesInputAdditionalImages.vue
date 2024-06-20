<script lang="ts" setup>
defineProps<{
  value: string[] | undefined
}>()

const emits = defineEmits<{
  filesChange: [File[]]
}>()

const toast = useToast()

const files = ref<File[]>([])
const filesLength = computed(() => files.value.length)
const hasMaximalAdditionalImages = computed(() => filesLength.value >= TEMPLATE_MAX_ADDITIONAL_IMAGES)

function handleFileChange(fileList: FileList) {
  if (fileList.length === 0) {
    return
  }

  for (const file of fileList) {
    if (filesLength.value >= TEMPLATE_MAX_ADDITIONAL_IMAGES) {
      toast.add({
        icon: 'i-heroicons-exclamation',
        title: `You can only add up to ${TEMPLATE_MAX_ADDITIONAL_IMAGES} additional images.`,
        color: 'orange',
      })
      return
    }

    files.value.push(file)
  }

  emits('filesChange', files.value)
  toast.add({
    icon: 'i-heroicons-photo',
    title: `${fileList.length} additional ${fileList.length > 1 ? 'images' : 'image'} have been added.`,
  })
}

function removeFile(index: number) {
  const [file] = files.value.splice(index, 1)

  emits('filesChange', files.value)
  toast.add({
    icon: 'i-heroicons-trash',
    title: `Additional image "${file.name}" has been removed.`,
    color: 'red',
  })
}

const inputAccept = computed(() => TEMPLATE_IMAGE_FORMAT.join(', '))
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-4">
    <TemplatesInputAdditionalImage
      v-for="(src, index) in value"
      :key="src"
      :src="src"
      @click="removeFile(index)"
    />
    <TemplatesInputCard class="aspect-[16/9]">
      <p
        class="font-semibold transition-colors"
        :class="{ 'group-hover:text-primary': !hasMaximalAdditionalImages }"
      >
        Add images ({{ filesLength }}/{{ TEMPLATE_MAX_ADDITIONAL_IMAGES }})
      </p>
      <p
        class="mt-2 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <template v-if="!hasMaximalAdditionalImages">
          Drag and drop images
          <br>
          or click to browse
        </template>
        <template v-else>
          Maximal additional images reached
        </template>
      </p>

      <template #input>
        <UInput
          type="file"
          :accept="inputAccept"
          multiple
          :disabled="hasMaximalAdditionalImages"
          :ui="{ wrapper: 'absolute inset-0 opacity-0', form: 'h-full w-full cursor-pointer' }"
          @change="handleFileChange"
        />
      </template>
    </TemplatesInputCard>
  </div>
</template>
