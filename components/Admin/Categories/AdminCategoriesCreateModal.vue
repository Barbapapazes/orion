<script lang="ts" setup>
import type { CreateCategoryValidatorSchema } from '~/utils/validators'
import type { FormSubmitEvent } from '#ui/types'

const emits = defineEmits<{
  created: []
}>()

const open = defineModel<boolean>('open', { required: true })

type Schema = CreateCategoryValidatorSchema

const state = reactive<Partial<Schema>>({
  name: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/categories', {
      method: 'POST',
      body: event.data,
    })
    emits('created')

    close()

    useSuccessToast(`Category "${event.data.name}" has been created`)
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
    title="Create category"
    description="A category must be able to group multiple templates"
    :ui="{ width: 'sm:max-w-md' }"
  >
    <AdminCategoriesForm
      :schema="createCategoryValidator"
      :state="state"
      @submit="onSubmit"
    />
  </UDashboardModal>
</template>
