<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { UForm } from '#components'

type State = Partial<CreateTemplateTextValidatorSchema>

const props = defineProps<{
  loading: boolean
  categories: Pick<Category, 'id' | 'name'>[]
  modules: Pick<Module, 'name' | 'id' | 'icon'>[]
  defaultState: State
}>()

const emits = defineEmits<{
  submit: [FormSubmitEvent<CreateTemplateTextValidatorSchema>]
}>()

const state = reactive<State>({
  title: props.defaultState.title,
  paidStatus: props.defaultState.paidStatus,
  categoryId: props.defaultState.categoryId,
  moduleIds: props.defaultState.moduleIds,
  liveUrl: props.defaultState.liveUrl,
  accessUrl: props.defaultState.accessUrl,
  shortDescription: props.defaultState.shortDescription,
  description: props.defaultState.description,
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

async function onReset() {
  // Erase some fields that are not native to the form.
  state.description = ''
  state.categoryId = undefined
  state.moduleIds = []

  if (form.value)
    // @ts-expect-error Should exists
    form.value.clear()
}

function onSubmit(event: FormSubmitEvent<CreateTemplateTextValidatorSchema>) {
  emits('submit', event)
}
</script>

<template>
  <UForm
    ref="form"
    class="flex flex-col gap-8"
    :schema="createTemplateTextValidator"
    :state="state"
    @submit="onSubmit"
  >
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
