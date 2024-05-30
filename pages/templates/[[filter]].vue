<script setup lang="ts">
const description = 'A community-driven collection of templates for your next project, from landing pages to complete web applications.'
useSeoMeta({
  description,
  ogDescription: description,
})

const items = [{
  label: 'What is Orion?',
  content: 'Orion is a community-driven collection of templates for your next project, from landing pages to complete web applications. It means that it is a website where you can find starter or themes built by Nuxt users for other Nuxt users.',
}, {
  label: 'How does it work?',
  content: 'As a user, you can browse the templates, filter them by categories, modules, and pricing, and then you can see the details of the template. Once you find a template that you like, you can easily access to it using the access link.',
}, {
  label: 'How can I submit a template?',
  content: 'To submit a template, you need to have a GitHub account. Once you have it, you can click on the "Submit a template" button to create an account. You\'ll be able to create a new template using a form and then submit it to review. Your template will be examined by the Orion team and then published if it meets the requirements.',
}, {
  label: 'Is Orion free?',
  content: 'Yes, Orion is free to use, for both the users and the creators. It\'s a project by the community for the community.',
}, {
  label: 'How can I contact the team?',
  content: 'You can contact the team by sending an email to orion@barbapapazes.dev or using the social media links in the footer.',
}]

const route = useRoute()
const filter = route.params.filter as string | undefined

const sorts = [
  { label: 'Random', value: 'random' },
  { label: 'Created', value: 'created' },
  { label: 'Title', value: 'title' },
]
const sort = ref(sorts[0])
const order = ref<1 | -1>(1)

const { data: categories } = await useFetch('/api/categories', {
  deep: false,
  default: () => [],
})

const categorySlug = ref<string>('')

if (filter && categories.value.length && categories.value.some(category => category.slug === filter)) {
  categorySlug.value = filter
}

const { data: modules } = await useFetch('/api/modules', {
  deep: false,
  default: () => [],
  transform: (data) => {
    // Order by name and then by type (official and then community).
    return data.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.type.localeCompare(a.type))
  },
})

const moduleSlug = ref<string>('')

if (filter && modules.value.length && modules.value.some(module => module.slug === filter)) {
  moduleSlug.value = filter
}

const templates = []
</script>

<template>
  <div>
    <ULandingHero
      :ui="{ wrapper: 'overflow-hidden', base: 'lg:text-left', links: 'lg:justify-start' }"
      :links="[{ label: 'Browse Templates', color: 'black', to: '#templates' }]"
    >
      <template #top>
        <img
          src="/images/hero-template-dark.svg"
          alt=""
          class="absolute -z-10 top-1/2 right-0 h-3/4 -translate-y-1/2 translate-x-1/4 opacity-40 lg:opacity-100"
        >
      </template>
      <template #title>
        Quickly start <br> your <span class="dark:text-[#00dc82]">Nuxt</span> project
      </template>
      <template #description>
        A community-driven collection of templates for your next project, <br class="hidden sm:inline"> from landing pages to complete web applications.
      </template>
    </ULandingHero>
    <section class="my-2 py-12 ring-1 dark:ring-gray-800 dark:bg-gray-800 dark:bg-opacity-20">
      <div class="px-4 max-w-screen-lg mx-auto flex flex-col items-center md:flex-row md:justify-around gap-12">
        <p class="flex flex-col gap-4 max-w-56">
          <span class="text-4xl md:text-5xl font-semibold"> 45 </span>
          <span class="dark:text-gray-400"> Templates available and ready to use across {{ categories.length }} categories.</span>
        </p>
        <p class="flex flex-col gap-4 max-w-56">
          <span class="text-4xl md:text-5xl font-semibold"> 34 </span>
          <span class="dark:text-gray-400"> Creators share their creations to
            help you start your project.
          </span>
        </p>
      </div>
    </section>
    <UContainer class="py-24 sm:py-32 md:py-40 flex flex-col md:flex-row gap-6 md:gap-8">
      <div class="w-full md:max-w-56">
        <div class="sticky top-20 flex flex-col gap-6">
          <div class="h-9 flex flex-row items-center justify-between">
            <p class="text-lg font-semibold">
              Filters
            </p>

            <UButton
              variant="ghost"
              color="gray"
              size="xs"
            >
              Reset
            </UButton>
          </div>

          <!-- Filters -->
          <div class="flex flex-col gap-6 md:gap-4">
            <USelectMenu
              v-model="categorySlug"
              :options="categories"
              placeholder="Categories"
              value-attribute="slug"
              option-attribute="name"
              size="md"
            />

            <USelectMenu
              v-model="moduleSlug"
              :options="modules"
              placeholder="Modules"
              value-attribute="slug"
              option-attribute="name"
              size="md"
            >
              <template #option="{ option }">
                <img
                  v-if="option.icon"
                  :src="`${MODULE_ICON_PREFIX}/${option.icon}`"
                  class="h-4 w-auto"
                >
                <span
                  v-else
                  class="i-heroicons-photo inline-block h-4 w-4"
                />
                <span>{{ option.name }}</span>
              </template>
            </USelectMenu>

            <USelectMenu
              :options="PAID_STATUS"
              placeholder="Pricing"
              size="md"
            >
              <template #option="{ option }">
                <PaidStatusBadge :status="option" />
              </template>
            </USelectMenu>
          </div>
        </div>
      </div>

      <div
        id="templates"
        class="w-full flex flex-col gap-6"
      >
        <!-- Actions Toolbar -->
        <div class="flex flex-row justify-between">
          <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            :trailing="false"
            placeholder="Search..."
            size="md"
          />

          <UButtonGroup size="md">
            <UButton
              :icon="order === 1 ? 'i-heroicons-bars-arrow-up' : 'i-heroicons-bars-arrow-down'"
              color="gray"
              @click="order *= -1"
            />
            <USelectMenu
              :model-value="sort"
              :options="sorts"
              color="white"
              class="w-32"
              @update:model-value="sort = $event"
            />
          </UButtonGroup>
        </div>

        <div>
          <UCard
            class="dark:bg-opacity-20 dark:bg-gray-800 py-40"
            :ui="{ body: { base: 'flex flex-col justify-center items-center gap-6' } }"
          >
            <p class="text-sm text-center dark:text-gray-400">
              No templates found.
            </p>
            <div class="flex flex-row justify-center items-center gap-2">
              <SubmitTemplateButton
                size="sm"
              />
              <UButton
                variant="ghost"
                color="gray"
              >
                Reset filters
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>

    <ULandingSection>
      <ULandingFAQ
        :ui="{ wrapper: 'max-w-screen-lg mx-auto' }"
        :items="items"
        multiple
      />
    </ULandingSection>
  </div>
</template>

<style>
#templates {
  scroll-margin-top: 6rem;
}
</style>
