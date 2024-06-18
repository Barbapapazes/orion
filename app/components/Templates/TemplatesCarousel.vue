<script lang="ts" setup>
const props = defineProps<{
  templateTitle: string
  images: string[]
}>()

const hasMultipleImages = props.images.length > 1
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    class="mt-8"
    :items="images"
    :ui="{ wrapper: 'group', item: 'aspect-[16/9] w-full rounded-2xl overflow-hidden', indicators: { wrapper: 'opacity-0 group-hover:opacity-100 transition', inactive: 'mix-blend-normal' }, default: { prevButton: { class: 'rtl:[&_span:first-child]:rotate-180 absolute left-0 opacity-0 disabled:opacity-0 top-1/2 transform -translate-y-1/2 rounded-full group-hover:opacity-100 group-hover:disabled:opacity-75 group-hover:left-4 transition-all' }, nextButton: { class: 'rtl:[&_span:last-child]:rotate-180 absolute right-0 opacity-0 disabled:opacity-0 top-1/2 transform -translate-y-1/2 rounded-full group-hover:opacity-100 group-hover:disabled:opacity-75 group-hover:right-4 transition-all' } } }"
    :arrows="hasMultipleImages"
    :indicators="hasMultipleImages"
    :prev-button="{
      color: 'gray',
    }"
    :next-button="{
      color: 'gray',
    }"
  >
    <img
      :src="item"
      :alt="`${templateTitle} image`"
      width="1920"
      height="1080"
      class="w-full aspect-[16/9] object-cover object-center rounded-2xl"
      draggable="false"
    >
  </UCarousel>
</template>
