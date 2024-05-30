<script lang="ts" setup>
const route = useRoute()
const hash = computed(() => {
  return (route.params.slug as string).slice(-12)
})
const { data: template } = await useFetch(`/api/templates/${hash.value}`, {
  deep: false,
  default: () => {},
})
</script>

<template>
  <article
    v-if="template"
    class="prose dark:prose-invert"
  >
    <h1> {{ template.title }} </h1>
    <div v-html="template.description" />
  </article>
</template>
