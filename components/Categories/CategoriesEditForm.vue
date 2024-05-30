<script lang="ts" setup>
import { type output } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { type Category } from '~/server/utils/drizzle'

const props = defineProps<{
  category: Category
}>()

const emits = defineEmits<{
  close: []
}>()

const toast = useToast()

type Schema = output<typeof updateCategoryValidator>

const state = reactive({
  name: props.category.name,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch(`/api/categories/${props.category.id}`, {
      method: 'PATCH',
      body: event.data,
    })
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Category "${event.data.name}" has been updated`,
      color: 'green',
    })
    emits('close')
  }
  catch (e) {
    if (e instanceof Error) {
      console.error(e)
      toast.add({
        icon: 'i-heroicons-exclamation-circle',
        title: 'Something went wrong',
        description: e.message,
        color: 'red',
      })
    }
  }
}
</script>

<template>
  <UForm
    :schema="updateCategoryValidator"
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
        Update
      </UButton>
    </div>
  </UForm>
</template>
