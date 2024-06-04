<script lang="ts" setup>
import 'quill/dist/quill.snow.css'
import '~/assets/css/quill.css'
import { type output } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  hash: string
  title: string
  paidStatus: typeof PAID_STATUS[number]
  categoryId: number
  moduleIds: number[]
  liveUrl: string | null
  accessUrl: string
  shortDescription: string
  description: string | null
}>()

const toast = useToast()

type Schema = output<typeof createTemplateValidator>

const form = ref()

const state = reactive<{
  title: undefined | string
  paidStatus: undefined | typeof PAID_STATUS[number]
  categoryId: undefined | number
  moduleIds: number[]
  liveUrl: string | undefined
  accessUrl: string
  shortDescription: string
  description: string | null
}>({
  title: props.title,
  paidStatus: props.paidStatus,
  categoryId: props.categoryId,
  moduleIds: props.moduleIds,
  liveUrl: props.liveUrl ?? undefined,
  accessUrl: props.accessUrl,
  shortDescription: props.shortDescription,
  description: props.description,
})

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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch(`/api/templates/${props.hash}`, {
      method: 'PATCH',
      body: event.data,
    })
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Template "${event.data.title}" has been updated`,
      color: 'green',
    })
    navigateTo(`/profile`)
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

const isPremium = computed(() => state.paidStatus ? state.paidStatus === 'premium' : false)

const quill = useQuill()

async function onReset() {
  form.value.clear()
  state.description = ''
  state.categoryId = undefined
  if (quill.value)
    quill.value.setText('')
}

watch(quill, () => {
  const delta = quill.value?.clipboard.convert({ html: state.description ?? '' })
  quill.value?.setContents(delta ?? [], 'silent')

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
        :options="paidStatusOptions"
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
