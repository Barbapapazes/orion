<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import type { EditTemplateImagesValidatorSchema } from '~/utils'

const route = useRoute()
const hash = computed(() => {
  return (route.params.slug as string).slice(-12)
})

const template = await useFetchTemplate(hash)

if (!template.value) {
  throw templateNotFoundError
}

const templateTitle = template.value.title
const templateHash = template.value.hash
const templateSlug = template.value.slug
const categorySlug = template.value.category.slug
const featuredImage = template.value.featuredImage
const additionalImages = template.value.additionalImages || []

const loading = ref(false)

type State = Partial<EditTemplateImagesValidatorSchema>
async function onSubmit(event: FormSubmitEvent<State>) {
  loading.value = true

  const formData = new FormData()

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
    await $fetch(`/api/templates/${templateHash}/images`, {
      method: 'PATCH',
      body: formData,
    })

    await refreshNuxtData(`template-${templateHash}`)
    // Since only the images are updated, we can navigate using the previously fetched template.
    await navigateTo(generateShowTemplateURL({
      categorySlug: categorySlug,
      slug: templateSlug,
      hash: templateHash,
    }))
  }
  catch (error) {
    handleFetchError(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Edit Template Images"
        :description="`You care currently editing '${templateTitle}'.`"
      />
      <UPageBody>
        <TemplatesEditImagesForm
          :loading="loading"
          :feature-image="featuredImage"
          :additional-images="additionalImages"
          @submit="onSubmit"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
