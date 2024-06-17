<script lang="ts" setup>
import type { EditCategoryValidatorSchema } from '~/utils/validators'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  id: number
  state: Partial<EditCategoryValidatorSchema>
}>()

const emits = defineEmits<{
  edited: []
}>()

const open = defineModel<boolean>('open', { required: true })

type Schema = EditCategoryValidatorSchema

const state = reactive<Partial<Schema>>({
  ...props.state,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch(`/api/categories/${props.id}`, {
      method: 'PATCH',
      body: event.data,
    })
    emits('edited')

    close()

    useSuccessToast(`Category "${event.data.name}" has been edited`)
  }
  catch (error) {
    handleFetchError(error)
  }
}

function close() {
  open.value = false
}
</script>

<template>
  <UDashboardModal
    v-model="open"
    title="Edit category"
    description="Be careful while editing a category."
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminCategoriesForm
      :schema="createCategoryValidator"
      :state="state"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>
