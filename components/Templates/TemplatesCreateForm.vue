<script lang="ts" setup>
import 'easymde/dist/easymde.min.css'
import { object, string, enum as zEnum, type output } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const schema = object({
  title: string({ message: 'Required' }),
  categoryId: string({ message: 'Required', coerce: true }),
  paidStatus: zEnum(['free', 'paid'], { message: 'Required' }),
  liveUrl: string({ message: 'Required' }).optional(),
  accessUrl: string({ message: 'Required' }),
  // ajouter une short description pour le SEO et sur la page de la list
  description: string({ message: 'Required' }), // rendre optionnel
})

type Schema = output<typeof schema>

const state = reactive({
  title: undefined,
  paidStatus: undefined,
  categoryId: undefined,
  liveUrl: undefined,
  accessUrl: undefined,
  description: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/templates', {
      method: 'POST',
      body: event.data,
    })
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Template "${event.data.title}" has been created`,
      color: 'green',
    })
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error)
      toast.add({
        icon: 'i-heroicons-exclamation-circle',
        title: 'Something went wrong',
        description: error.message,
        color: 'red',
      })
    }
  }
}

async function onError(event: FormErrorEvent) {
  console.log(event)
}

const options = [{
  value: 'free',
  label: 'Free',
}, {
  value: 'paid',
  label: 'Paid',
}]

const { data: categories } = await useFetch('/api/categories', {
  deep: false,
  default: () => [],
})

onMounted(async () => {
  const EasyMDE = await import('easymde').then(m => m.default)
  const easyMDE = new EasyMDE({
    placeholder: 'Type here...',
    autoDownloadFontAwesome: false,
    toolbar: [{
      name: 'bold',
      action: EasyMDE.toggleBold,
      className: 'i-heroicons-bold',
      title: 'Bold',
    },
    'heading-2', // use lucide icon
    'heading-3',
    ],
    spellChecker: false,
    status: false,
  })
  easyMDE.codemirror.on('change', () => {
    state.description = easyMDE.value() || ''
  })
})
</script>

<template>
  <UForm
    class="p-4"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    @error="onError"
  >
    <UFormGroup
      label="Title"
      name="title"
      required
    >
      <UInput
        v-model="state.title"
        type="text"
      />
    </UFormGroup>

    <UFormGroup
      label="Paid Status"
      name="paidStatus"
      required
    >
      <URadioGroup
        v-model="state.paidStatus"
        :options="options"
      />
    </UFormGroup>

    <UFormGroup
      label="Category"
      name="category"
      required
    >
      <USelectMenu
        v-model="state.categoryId"
        :options="categories"
        value-attribute="id"
        option-attribute="name"
      />
    </UFormGroup>

    <UFormGroup
      label="Live URL"
      name="liveUrl"
    >
      <UInput
        v-model="state.liveUrl"
        type="url"
      />
    </UFormGroup>
    <UFormGroup
      label="Access URL"
      name="accessUrl"
      required
    >
      <UInput
        v-model="state.accessUrl"
        type="url"
      />
    </UFormGroup>
    <UFormGroup
      label="Description"
      name="description"
      required
    >
      <UTextarea
        v-model="state.description"
      />
    </UFormGroup>

    <div class="flex flex-row">
      <UButton type="submit">
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<style>
.editor-toolbar {
  border: 1px solid theme('colors.gray.700');
  border-top-left-radius: theme('borderRadius.md');
  border-top-right-radius: theme('borderRadius.md');
}

.editor-toolbar button {
  background-color: theme('colors.gray.200');
  height: theme('height.4');
}

.EasyMDEContainer .CodeMirror {
  border: 1px solid theme('colors.gray.700');
  border-top: none;
  border-bottom-left-radius: theme('borderRadius.md');
  border-bottom-right-radius: theme('borderRadius.md');
  background-color: transparent;
  color: white;
}

.CodeMirror-cursor {
  border-left: 1px solid theme('colors.gray.400');
}
</style>
