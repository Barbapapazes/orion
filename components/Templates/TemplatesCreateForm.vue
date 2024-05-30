<script lang="ts" setup>
import type Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { type output } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

type Schema = output<typeof createTemplateValidator>

const quill = shallowRef<Quill | undefined>()
const form = ref()

const state = reactive({
  title: undefined,
  paidStatus: undefined,
  categoryId: undefined,
  moduleIds: [],
  liveUrl: undefined,
  accessUrl: undefined,
  shortDescription: '',
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

async function onReset() {
  form.value.clear()
  state.description = ''
  state.categoryId = undefined
  if (quill.value)
    quill.value.setText('')
}

const options = [{
  value: 'free',
  label: 'Free',
}, {
  value: 'freemium',
  label: 'Freemium',
}, {
  value: 'premium',
  label: 'Premium',
}]

const isPremium = computed(() => state.paidStatus === 'premium')

const { data: categories } = await useFetch('/api/categories', {
  deep: false,
  default: () => [],
})

const { data: modules } = await useFetch('/api/modules', {
  deep: false,
  default: () => [],
  transform: (data) => {
    // Order by name and then by type (official and then community).
    return data.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.type.localeCompare(a.type))
  },
})

onBeforeMount(async () => {
  const Quill = await import('quill').then(m => m.default)
  quill.value = new Quill('#editor', {
    modules: {
      toolbar: [
        [{ header: 2 }, { header: 3 }],
        ['bold', 'italic', 'underline'],
        [{
          list: 'ordered',
        }, {
          list: 'bullet',
        }], ['blockquote'], ['clean']],
    },
    placeholder: 'Tell us more about your template (features, specificities and everything that makes it unique)...',
    theme: 'snow',
  })
  quill.value?.on('text-change', (_, __, source) => {
    // Source is 'api' when the form is reset
    if (source === 'api') return
    state.description = quill.value?.root.innerHTML ?? ''
    form.value.validate('description', { silent: true })
  })
})
</script>

<template>
  <UForm
    ref="form"
    class="flex flex-col gap-8"
    :schema="createTemplateValidator"
    :state="state"
    @submit="onSubmit"
  >
    <UFormGroup
      label="Title"
      name="title"
      required
    >
      <UInput
        v-model="state.title"
        placeholder="My Nuxt Template"
        type="text"
      />
    </UFormGroup>

    <UFormGroup
      label="Paid Status"
      name="paidStatus"
      help="A freemium template is free but has premium features. A premium template is paid."
      required
    >
      <URadioGroup
        v-model="state.paidStatus"
        :ui="{ fieldset: 'flex flex-row gap-4' }"
        :options="options"
      />
    </UFormGroup>

    <div class="contents md:grid md:grid-cols-2 md:gap-8">
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
          placeholder="Select a category"
        />
      </UFormGroup>

      <UFormGroup
        label="Modules"
        name="modules"
      >
        <USelectMenu
          v-model="state.moduleIds"
          :options="modules"
          multiple
          value-attribute="id"
          option-attribute="name"
          placeholder="Select one or multiples modules"
        >
          <template #option="{ option }">
            <img
              v-if="option.icon"
              :src="`${MODULE_ICON_PREFIX}/${option.icon}`"
              class="h-4 w-auto"
            >
            <span
              v-else
              class="i-heroicons-photo inline-block h-4 w-4"
            />
            <span>{{ option.name }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>
    </div>

    <div class="contents md:grid md:grid-cols-2 md:gap-8">
      <UFormGroup
        label="Live URL"
        name="liveUrl"
        help="A URL where user can see the template in action."
      >
        <UInput
          v-model="state.liveUrl"
          placeholder="https://example.com/preview"
          type="url"
        />
      </UFormGroup>
      <UFormGroup
        :label="isPremium ? 'Purchase URL' : 'Public Repo URL'"
        name="accessUrl"
        help="A URL where user can access the template."
        required
      >
        <UInput
          v-model="state.accessUrl"
          :placeholder="isPremium ? 'https://stripe.com/me/template': 'https://github.com/barbapapazes/orion'"
          type="url"
        />
      </UFormGroup>
    </div>

    <UFormGroup
      label="Short Description"
      name="shortDescription"
      required
      :hint="`${state.shortDescription?.length || 0}/${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters`"
      help="A short description for SEO and list page."
    >
      <UTextarea
        v-model="state.shortDescription"
        placeholder="Concisely describe your template..."
        :rows="5"
      />
    </UFormGroup>

    <UFormGroup
      label="Description"
      name="description"
      :hint="`${state.description?.length || 0}/${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`"
    >
      <div id="editor" />
    </UFormGroup>

    <div class="flex flex-row justify-end gap-4">
      <UButton
        variant="ghost"
        color="gray"
        type="reset"
        @click="onReset()"
      >
        Reset
      </UButton>
      <UButton type="submit">
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<style>
/* All colors are for the DARK. I must do the light. */
.ql-snow.ql-toolbar {
  border-color: theme('colors.gray.700');
  border-top-left-radius: theme('borderRadius.md');
  border-top-right-radius: theme('borderRadius.md')
}
.ql-snow.ql-toolbar button:hover .ql-fill {
  fill: theme('colors.primary.600')
}
.ql-snow.ql-toolbar button:hover .ql-stroke {
  stroke: theme('colors.primary.600')
}
.ql-snow.ql-toolbar button.ql-active .ql-fill {
  fill: theme('colors.primary.600')
}
.ql-snow.ql-toolbar button.ql-active .ql-stroke {
  stroke: theme('colors.primary.600')
}
.ql-snow .ql-fill {
  fill: theme('colors.gray.400')
}
.ql-snow .ql-stroke {
  stroke: theme('colors.gray.400')
}
.ql-snow.ql-container {
  border-color: theme('colors.gray.700');
  border-bottom-left-radius: theme('borderRadius.md');
  border-bottom-right-radius: theme('borderRadius.md');
  font-size: theme('fontSize.sm');
  font-family: theme('fontFamily.sans');
}
.ql-editor {
  min-height: theme('spacing.32');
}
.ql-editor.ql-blank::before {
  color: theme('colors.gray.500');
  font-style: normal;
}
.ql-editor {
  color: theme('colors.white')
}
</style>
