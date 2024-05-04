<script lang="ts" setup>
import { object, string, type output } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { type Category } from '~/server/utils/drizzle'

const props = defineProps<{
  category: Category
}>()

const emits = defineEmits<{
  close: [void]
}>()

const toast = useToast()

const schema = object({
  name: string({ message: 'Required' }),
})

type Schema = output<typeof schema>

const state = reactive({
  name: props.category.name,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
   await $fetch(`/api/categories/${props.category.id}`, {
      method: 'PUT',
      body: event.data,
    })
     toast.add({
      icon: "i-heroicons-check-circle",
      title:  `Category "${event.data.name}" has been updated`,
      color: 'green',
    })
    emits('close')
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      toast.add({
        icon: "i-heroicons-exclamation-circle",
        title: 'Something went wrong',
        description: e.message,
        color: 'red',
      })
    }
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UButton type="submit">
      Update
    </UButton>
  </UForm>
</template>
