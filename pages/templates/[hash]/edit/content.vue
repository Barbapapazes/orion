<script lang="ts" setup>
const { user } = useUserSession()

const route = useRoute()
const hash = route.params.hash as string

const { data: template } = await useFetch(`/api/templates/${hash}`, {
  deep: false,
  default: () => {},
})

// Redirect if the user is not the creator of the template.
if (template.value?.creator?.id !== user.value?.id) {
  navigateTo('/templates')
}
</script>

<template>
  <UContainer v-if="template">
    <UPage>
      <UPageHeader
        title="Edit template content"
        :description="`You are currently editing '${template.title}'.`"
      />
      <UPageBody>
        <TemplatesEditContentForm
          :hash="hash"
          :title="template.title"
          :short-description="template.shortDescription"
          :description="template.description"
          :category-id="template.category.id"
          :module-ids="template.modules.map(module => module.module.id)"
          :paid-status="template.paidStatus"
          :live-url="template.liveUrl"
          :access-url="template.accessUrl"
          :creator="template.creator"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
