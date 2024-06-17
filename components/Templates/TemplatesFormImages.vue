<script lang="ts" setup>
const props = defineProps<{
  // We cannot accept files since we only have the URL when editing a template.
  featuredImage: string | undefined
  additionalImages: string[] | undefined
}>()

export interface TemplateFormImagesState {
  featuredImage: File | undefined
  additionalImages: File[]
}

const emits = defineEmits<{
  change: [TemplateFormImagesState]
}>()

const state = reactive<TemplateFormImagesState>({
  featuredImage: undefined,
  additionalImages: [],
})

watch(state, () => {
  emits('change', state)
})
</script>

<template>
  <UFormGroup
    label="Featured image"
    name="featuredImage"
    help="This image will be displayed on the template list page and on the template page."
    :hint="`Maximum size: 1920x1080px, and ${TEMPLATE_MAX_IMAGE_SIZE_KB}kB`"
    required
  >
    <TemplatesInputFeaturedImage
      :value="props.featuredImage"
      @file-change="state.featuredImage = $event"
    />
  </UFormGroup>

  <UFormGroup
    label="Additional Images"
    name="additionalImages"
    help="These images will be displayed on the template page in addition to the featured image."
    :hint="`Maximum size: 1920x1080px, and ${TEMPLATE_MAX_IMAGE_SIZE_KB}kB`"
  >
    <TemplatesInputAdditionalImages
      :value="props.additionalImages"
      @files-change="state.additionalImages = $event"
    />
  </UFormGroup>
</template>
