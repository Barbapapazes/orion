<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} - Orion` : 'Orion: Quickly Start your Nuxt Project',
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
