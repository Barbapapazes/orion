<script lang="ts" setup>
import type { EmitterSource } from 'quill'
import type { FormSubmitEvent } from '#ui/types'
import type { UForm, RichTextEditor } from '#components'

defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  submit: [FormSubmitEvent<CreateTemplateValidatorSchema>]
}>()

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

const form = ref<InstanceType<typeof UForm> | null>(null)

function onDescriptionChange(content: string, source: EmitterSource) {
  if (source === 'api') return
  state.description = content
  if (form.value)
    // @ts-expect-error Should exists
    form.value.validate('description', { silent: true })
}

const richTextEditor = ref<InstanceType<typeof RichTextEditor> | null>(null)

async function onReset() {
  state.description = ''
  state.categoryId = undefined
  state.moduleIds = []
  state.featuredImage = undefined
  state.additionalImages = []

  if (form.value)
    // @ts-expect-error Should exists
    form.value.clear()
  if (richTextEditor.value)
    richTextEditor.value.reset()
}

function onSubmit(event: FormSubmitEvent<CreateTemplateValidatorSchema>) {
  emits('submit', event)
}
</script>

<template>
  <UForm
    ref="form"
    class="flex flex-col gap-8"
    :schema="createTemplateValidator"
    :state="state"
    @submit="onSubmit"
  >
    <div
      class="flex flex-col gap-8"
    >
      <h2 class="text-lg font-semibold">
        Images
      </h2>

      <UFormGroup
        label="Featured image"
        name="featuredImage"
        help="This image will be displayed on the template list page and on the template page."
        :hint="`Maximum size: 1920x1080px, and ${TEMPLATE_MAX_IMAGE_SIZE_KB}kB`"
        required
      >
        <TemplatesInputFeaturedImage
          @file-change="state.featuredImage = $event"
        />
      </UFormGroup>

      <UFormGroup
        label="Additional Images"
        name="additionalImages"
        help="These images will be displayed on the template page in addition to the featured image."
        :hint="`Maximum size: 1920x1080px, and ${TEMPLATE_MAX_IMAGE_SIZE_KB}kB`"
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
        :hint="`${state.title?.length || 0}/${TEMPLATE_MAX_TITLE_LENGTH} characters`"
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
          name="categoryId"
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
          name="moduleIds"
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
        <RichTextEditor
          ref="richTextEditor"
          @change="onDescriptionChange"
        />
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
      <UButton
        type="submit"
        :loading="loading"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>
