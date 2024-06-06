<script lang="ts" setup>
import type { EmitterSource } from 'quill'

export interface TemplateFormTextState {
  title: string | undefined
  paidStatus: typeof PAID_STATUS[number] | undefined
  categoryId: string | undefined
  moduleIds: string[]
  liveUrl: string | undefined
  accessUrl: string | undefined
  shortDescription: string
  description: string
}

const props = defineProps<{
  categories: Pick<Category, 'id' | 'name'>[]
  modules: Pick<Module, 'name' | 'id' | 'icon'>[]
  state: TemplateFormTextState
}>()

const emits = defineEmits<{
  change: [TemplateFormTextState]
}>()

// Create a new internal reactive object with the props state to avoid mutation.
const state = reactive<TemplateFormTextState>({ ...props.state })

// Watch for props changes to allow the parent to update and reset the internal state.
watch(() => props.state, (value) => {
  Object.assign(state, value)
}, { deep: true })

// Emit the change event when the internal state changes.
watch(state, () => {
  emits('change', state)
})

const isPremium = computed(() => state.paidStatus === 'premium')

function onDescriptionChange(content: string, source: EmitterSource) {
  if (source === 'api') return
  state.description = content
}
</script>

<template>
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
      :model-value="state.description"
      @update:model-value="onDescriptionChange"
    />
  </UFormGroup>
</template>
