<template>
  <ULandingHero
    :ui="{ wrapper: 'overflow-hidden', base: 'lg:text-left', links: 'lg:justify-start' }"
    :links="[{ label: 'Browse Templates', color: 'black', to: '#templates' }]"
  >
    <template #top>
      <div class="absolute -z-10 left-4 right-4 top-[70%] lg:top-1/2 lg:mx-0 lg:left-0 lg:right-0 lg:h-3/4 -translate-y-1/2 lg:translate-x-1/4">
        <img
          src="/images/hero-template-dark.svg"
          aria-hidden="true"
          class="w-full max-w-screen-sm lg:max-w-screen-md mx-auto opacity-20 lg:opacity-40"
        >
      </div>
    </template>
    <template #title>
      Quickly start <br> your <span class="dark:text-[#00dc82]">Nuxt</span> project
    </template>
    <template #description>
      A community-driven collection of templates for your next project, <br class="hidden sm:inline"> from landing pages to complete web applications.
    </template>
  </ULandingHero>
</template>
