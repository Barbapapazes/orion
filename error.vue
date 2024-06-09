<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: props.error.statusMessage,
  description: props.error.message,
})
</script>

<template>
  <div>
    <AppHeader />

    <UContainer>
      <UMain>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UMain>
    </UContainer>

    <AppFooter />
  </div>
</template>
