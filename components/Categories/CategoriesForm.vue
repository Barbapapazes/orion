<script lang="ts" setup>
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const emits = defineEmits<{
  close: [void]
}>()

const schema = object({
  name: string().required('Required'),
})

type Schema = InferType<typeof schema>

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
      title:  'Success',
      color: 'green',
    })
    emits('close')
  } catch (e) {
    console.error(e)
    toast.add({
      icon: "i-heroicons-exclamation-circle",
      title: 'Error',
      color: 'red',
    })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
