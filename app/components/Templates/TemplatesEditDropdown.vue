<script lang="ts" setup>
const props = defineProps<{
  templateSlug: string
  templateHash: string
  categorySlug: string
}>()

const items = [[{
  label: 'Edit Content',
  icon: PEN_ICON,
  to: generateEditTextTemplateURL({
    slug: props.templateSlug,
    hash: props.templateHash,
    categorySlug: props.categorySlug,
  }),
}, {
  label: 'Edit Images',
  icon: PHOTO_ICON,
  to: generateEditImagesTemplateURL({
    slug: props.templateSlug,
    hash: props.templateHash,
    categorySlug: props.categorySlug,
  }),
}]]
</script>

<template>
  <UDropdown
    :items="items"
  >
    <UButton
      color="white"
      variant="solid"
      size="lg"
    >
      Edit Template
    </UButton>
  </UDropdown>
</template>
