<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { UForm } from '#components'
import type { TemplateFormImagesState } from '~/components/Templates/TemplatesFormImages.vue'

type State = Partial<CreateTemplateValidatorSchema>

defineProps<{
  loading: boolean
  categories: Pick<Category, 'id' | 'name'>[]
  modules: Pick<Module, 'name' | 'id' | 'icon'>[]
}>()

const emits = defineEmits<{
  submit: [FormSubmitEvent<CreateTemplateValidatorSchema>]
}>()

const state = reactive<State>({
  featuredImage: undefined,
  additionalImages: [],
  title: undefined,
  paidStatus: undefined,
  categoryId: undefined,
  moduleIds: [],
  liveUrl: undefined,
  accessUrl: undefined,
  shortDescription: '',
  description: '',
})

const form = ref<InstanceType<typeof UForm> | null>(null)

function onTextChange(textState: State) {
  const oldDescription = state.description

  Object.assign(state, textState)

  // Because the description lives in a Rich Text Editor, it cannot be automatically validated by the form.
  if (oldDescription !== textState.description) {
    // @ts-expect-error Should options exists
    form.value?.validate('description', { silent: true })
  }
}

function onImagesChange(imagesState: TemplateFormImagesState) {
  Object.assign(state, imagesState)
}

const featuredImageValue = computed(() => {
  return state.featuredImage ? urlFromFile(state.featuredImage) : undefined
})

const additionalImagesValue = computed(() => {
  return state.additionalImages?.map(file => urlFromFile(file))
})

async function onReset() {
  // Erase some fields that are not native to the form.
  state.description = ''
  state.categoryId = undefined
  state.moduleIds = []
  state.featuredImage = undefined
  state.additionalImages = []

  if (form.value)
    // @ts-expect-error Should exists
    form.value.clear()
}

function onSubmit(event: FormSubmitEvent<CreateTemplateValidatorSchema>) {
  emits('submit', event)
}
</script>

<template>
  <UForm
    ref="form"
    class="flex flex-col gap-8"
    :schema="createTemplateValidator"
    :state="state"
    @submit="onSubmit"
  >
    <div
      class="flex flex-col gap-8"
    >
      <h2 class="text-lg font-semibold">
        Images
      </h2>
      <TemplatesFormImages
        :featured-image="featuredImageValue"
        :additional-images="additionalImagesValue"
        @change="onImagesChange($event)"
      />
    </div>

    <div
      class="flex flex-col gap-8"
    >
      <h2 class="text-lg font-semibold">
        Content
      </h2>
      <TemplatesFormText
        :modules="modules"
        :categories="categories"
        :state="state"
        @change="onTextChange($event)"
      />
    </div>

    <div class="flex flex-row justify-end gap-4">
      <UButton
        variant="ghost"
        color="gray"
        type="reset"
        @click="onReset()"
      >
        Reset
      </UButton>
      <UButton
        type="submit"
        :loading="loading"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>
