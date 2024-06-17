<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'

type State = Partial<CreateTemplateTextValidatorSchema>

const route = useRoute()
const hash = computed(() => {
  return (route.params.slug as string).slice(-12)
})

const template = await useFetchTemplate(hash)

if (!template.value) {
  throw templateNotFoundError
}

const categories = await useFetchCategories()

if (!categories.value) {
  throw categoriesNotFoundError
}

const modules = useFetchModules()

if (!modules.value) {
  throw modulesNotFoundError
}

const templateTitle = template.value.title
const templateHash = template.value.hash

const defaultState: State = {
  title: template.value.title,
  description: template.value.description || undefined,
  categoryId: template.value.category.id,
  moduleIds: template.value.modules.map(module => module.module.id),
  liveUrl: template.value.liveUrl || undefined,
  accessUrl: template.value.accessUrl,
  shortDescription: template.value.shortDescription,
  paidStatus: template.value.paidStatus,
}

const toast = useToast()
const loading = ref(false)
async function onSubmit(event: FormSubmitEvent<State>) {
  loading.value = true

  try {
    const template = await $fetch(`/api/templates/${templateHash}`, {
      method: 'PATCH',
      body: event.data,
    })

    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Template "${event.data.title}" has been updated`,
      color: 'green',
    })
    const category = categories.value!.find(category => category.id === event.data.categoryId)

    /**
     * This case should never happen.
     */
    if (!category) {
      toast.add({
        icon: 'i-heroicons-exclamation-circle',
        title: 'Category not found',
        description: 'The category for the template was not found but your template have been created. Please contact the administrator.',
        color: 'red',
      })
      return navigateTo('/profile')
    }

    await refreshNuxtData(`template-${templateHash}`)
    navigateTo(generateShowTemplateURL({ slug: template.slug, hash: template.hash, categorySlug: category.slug }))
  }
  catch (error) {
    toast.add({
      icon: 'i-heroicons-exclamation-circle',
      title: 'An error occurred',
      description: 'An error occurred while updating the template. Please try again later.',
      color: 'red',
    })
  }
  finally {
    loading.value = false
  }
}

useSeoMeta({
  title: `Edit ${templateTitle}`,
  description: `Edit the content of the template ${templateTitle}.`,
})
</script>

<template>
  <UContainer v-if="template">
    <UPage>
      <UPageHeader
        title="Edit Template Content"
        :description="`You are currently editing '${templateTitle}'.`"
      />
      <UPageBody>
        <TemplatesEditContentForm
          v-if="modules && categories && template"
          :loading="loading"
          :modules="modules"
          :categories="categories"
          :default-state="defaultState"
          @submit="onSubmit"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
