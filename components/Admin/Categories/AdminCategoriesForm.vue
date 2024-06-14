<script lang="ts" setup generic="T extends Partial<{ name: string }>">
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  schema: unknown
  state: T
}>()

const emits = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: [FormSubmitEvent<any>]
}>()

const state = reactive({
  ...props.state,
})

function onSubmit(event: FormSubmitEvent<unknown>) {
  emits('submit', event)
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup
      label="Name"
      name="name"
      :hint="`${state.name?.length || 0}/${CATEGORY_MAX_NAME_LENGTH} characters`"
    >
      <UInput v-model="state.name" />
    </UFormGroup>

    <div class="flex flex-row justify-end">
      <UButton type="submit">
        Submit
      </UButton>
    </div>
  </UForm>
</template>
