<script lang="ts" setup>
const imgClass = 'w-full max-w-screen-sm lg:max-w-screen-md mx-auto lg:mx-0 lg:opacity-40'
</script>

<template>
  <ULandingHero
    :ui="{ wrapper: 'overflow-hidden', base: 'lg:text-left', links: 'lg:justify-start' }"
    :links="[{ label: 'Browse Templates', color: 'black', to: '#templates' }]"
  >
    <template #top>
      <div class="absolute -z-10 left-4 lg:left-auto right-4 lg:-right-12 top-[50%] lg:top-1/2 lg:mx-0 lg:h-4/5 -translate-y-1/2">
        <img
          src="/images/hero-template-dark.svg"
          aria-hidden="true"
          class="hidden dark:block opacity-20 "
          :class="imgClass"
        >
        <img
          src="/images/hero-template-light.svg"
          aria-hidden="true"
          class="dark:hidden opacity-30"
          :class="imgClass"
        >
      </div>
    </template>
    <template #title>
      Quickly start <br> your <span class="text-[#00dc82]">Nuxt</span> project
    </template>
    <template #description>
      A community-driven collection of templates for your next project, <br class="hidden sm:inline"> from landing pages to complete web applications.
    </template>
  </ULandingHero>
</template>
