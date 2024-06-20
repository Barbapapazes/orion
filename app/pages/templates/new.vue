<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'

const categories = await useFetchCategories()

if (!categories.value) {
  throw categoriesNotFoundError
}

const modules = await useFetchModules()

if (!modules.value) {
  throw modulesNotFoundError
}

const loading = ref(false)
async function onSubmit(event: FormSubmitEvent<CreateTemplateValidatorSchema>) {
  loading.value = true
  const formData = new FormData()

  // Create a FormData object with the state values.
  for (const [key, value] of Object.entries(event.data)) {
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
    const template = await $fetch('/api/templates', {
      method: 'POST',
      body: formData,
    })
    useSuccessToast(`Template "${event.data.title}" has been created`)
    const category = categories.value!.find(category => category.id === event.data.categoryId)

    /**
     * This case should never happen.
     */
    if (!category) {
      useErrorToast('Category not found', 'The category for the template was not found but your template have been created. Please contact the administrator.')
      return navigateTo('/profile')
    }

    /**
     * This case should never happen.
     */
    if (!template) {
      useErrorToast('Template not found', 'The template was not found but your template have been created. Please contact the administrator.')
      return navigateTo('/profile')
    }

    navigateTo(generateShowTemplateURL({ slug: template.slug, hash: template.hash, categorySlug: category.slug }))
  }
  catch (error) {
    if (error instanceof Error) {
      useErrorToast('An error occurred', 'An error occurred while creating the template. Please try again later.')
    }
  }
  finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Submit a new template',
  description: 'Thank you for sharing your creation with the community!',
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Submit a new template"
        description="Thank you for sharing your creation with the community!"
      />
      <UPageBody class="flex flex-col lg:flex-row gap-8">
        <div class="order-2 lg:order-1 lg:w-9/12 flex flex-col gap-2">
          <TemplatesCreateForm
            v-if="categories && modules"
            :loading="loading"
            :categories="categories"
            :modules="modules"
            @submit="onSubmit($event)"
          />
        </div>
        <div class="order-1 lg:order-2 lg:w-3/12">
          <TemplatesGuideline class="sticky top-24" />
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
