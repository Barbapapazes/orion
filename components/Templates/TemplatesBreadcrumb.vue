<script lang="ts" setup>
const props = defineProps<{
  templateTitle: string
  categoryName: string
  categorySlug: string
}>()

const breadcrumbLinks = [{
  label: 'Templates',
  icon: TEMPLATE_ICON,
  to: '/templates#templates',
},
{
  label: props.categoryName,
  icon: CATEGORY_ICON,
  to: `/templates/${props.categorySlug}#templates`,
},
{
  label: props.templateTitle,
}]
</script>

<template>
  <UBreadcrumb :links="breadcrumbLinks" />
</template>
