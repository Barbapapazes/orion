<script lang="ts" setup>
import { object, string, type output } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const emits = defineEmits<{
  close: []
}>()

const schema = object({
  name: string({ message: 'Required' }),
})

type Schema = output<typeof schema>

const state = reactive({
  name: undefined,
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
   await $fetch('/api/categories', {
      method: 'POST',
      body: event.data,
    })
     toast.add({
      icon: "i-heroicons-check-circle",
      title:  `Category "${event.data.name}" has been created`,
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

    <div class="flex flex-row justify-end">
      <UButton type="submit">
        Submit
      </UButton>
    </div>
  </UForm>
</template>
