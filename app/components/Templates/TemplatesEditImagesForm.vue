<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { TemplateFormImagesState } from '~/components/Templates/TemplatesFormImages.vue'
import type { EditTemplateImagesValidatorSchema } from '~/utils'

type State = Partial<EditTemplateImagesValidatorSchema>

const props = defineProps<{
  loading: boolean
  featureImage: string
  additionalImages: string[]
}>()

const emits = defineEmits<{
  submit: [FormSubmitEvent<State>]
}>()

const state = reactive<State>({
  featuredImage: props.featureImage,
  additionalImages: props.additionalImages,
})

const featuredImageValue = computed(() => {
  if (typeof state.featuredImage === 'string') {
    return state.featuredImage
  }

  return state.featuredImage ? getURLfromFile(state.featuredImage) : undefined
})

const additionalImagesValue = computed(() => {
  return state.additionalImages?.map((file) => {
    if (typeof file === 'string') {
      return file
    }

    return getURLfromFile(file)
  })
})

function onImagesChange(imagesState: TemplateFormImagesState) {
  Object.assign(state, imagesState)
}

function onSubmit(event: FormSubmitEvent<State>) {
  emits('submit', event)
}
</script>

<template>
  <UForm
    :state="state"
    :schema="editTemplateImagesValidator"
    class="flex flex-col gap-8"
    @submit="onSubmit"
  >
    <TemplatesFormImages
      :featured-image="featuredImageValue"
      :additional-images="additionalImagesValue"
      @change="onImagesChange($event)"
    />

    <div class="flex flex-end">
      <UButton
        type="submit"
        :loading="loading"
      >
        Save
      </UButton>
    </div>
  </UForm>
</template>
