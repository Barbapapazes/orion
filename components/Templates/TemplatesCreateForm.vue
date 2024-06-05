<script lang="ts" setup>
import 'quill/dist/quill.snow.css'
import '~/assets/css/quill.css'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const form = ref()

const state = reactive<{
  featuredImage: File | undefined
  additionalImages: File[]
  title: string | undefined
  paidStatus: typeof PAID_STATUS[number] | undefined
  categoryId: string | undefined
  moduleIds: string[]
  liveUrl: string | undefined
  accessUrl: string | undefined
  shortDescription: string
  description: string
}>({
  featuredImage: undefined,
  additionalImages: [],
  title: undefined,
  paidStatus: undefined,
  categoryId: undefined,
  moduleIds: [],
  liveUrl: undefined,
  accessUrl: undefined,
  shortDescription: '',
  description: '',
})

async function onSubmit(event: FormSubmitEvent<CreateTemplateValidatorSchema>) {
  const formData = new FormData()

  // Create a FormData object with the state values.
  for (const key in state) {
    const value = state[key]

    if (value === undefined) continue

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item)
      })
    }
    else {
      formData.append(key, value)
    }
  }

  try {
    await $fetch('/api/templates', {
      method: 'POST',
      body: formData,
    })
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Template "${event.data.title}" has been created`,
      color: 'green',
    })
    navigateTo('/profile')
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

// const validate = (state: any): FormError[] => {
//   console.log(state)
//   const errors = []
//   const data = createTemplateImagesValidator.safeParse({
//     featuredImage: state.featuredImage,
//     additionalImages: state.additionalImages,
//   })
//   console.log(data)
//   return errors
// }

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

const quill = useQuill()

async function onReset() {
  form.value.clear()
  state.description = ''
  state.categoryId = undefined
  if (quill.value)
    quill.value.setText('')
}

watch(quill, () => {
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
    :schema="createTemplateImagesValidator"
    :state="state"
    @submit="onSubmit"
  >
    <div
      class="flex flex-col gap-8"
    >
      <h2 class="text-lg font-semibold">
        Images
      </h2>

      <!-- TODO: Use var for 500kb -->
      <UFormGroup
        label="Featured image"
        name="featuredImage"
        help="This image will be displayed on the template list page and on the template page."
        hint="Maximum size: 1920x1080px, and 500kB"
        required
      >
        <TemplatesInputFeaturedImage
          @file-change="state.featuredImage = $event"
        />
      </UFormGroup>

      <!-- TODO: Use var for 500kb -->
      <UFormGroup
        label="Additional Images"
        name="additionalImages"
        help="These images will be displayed on the template page in addition to the featured image."
        hint="Maximum size: 1920x1080px, and 500kB"
      >
        <TemplatesInputAdditionalImages
          @files-change="state.additionalImages = $event"
        />
      </UFormGroup>
    </div>

    <div
      class="flex flex-col gap-8"
    >
      <h2 class="text-lg font-semibold">
        Content
      </h2>
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
    </div>

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
