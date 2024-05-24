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

const pricing = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
]

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
  <div class="grow">
    <ULandingHero :links="[{ label: 'Browse Templates', color: 'black', to: '#templates' }]">
      <template #title>
        Quickly start <br> your <span class="dark:text-[#00dc82]">Nuxt</span> project
      </template>
      <template #description>
        A community-driven collection of templates for your next project, <br class="hidden sm:inline"> from landing pages to complete web applications.
      </template>
    </ULandingHero>
    <section class="mt-4 mb-20 py-12 border-y dark:border-gray-800 dark:bg-gray-800 dark:bg-opacity-60">
      <div class="px-4 max-w-screen-lg mx-auto flex flex-row justify-around">
        <p class="flex flex-col gap-4 max-w-56">
          <span class="text-4xl font-semibold"> 45 </span>
          <span class="dark:opacity-60"> Templates available and ready to use across {{ categories.length }} categories.</span>
        </p>
        <p class="flex flex-col gap-4 max-w-56">
          <span class="text-4xl font-semibold"> 34 </span>
          <span class="dark:opacity-60"> Creators share their creations. You could be one of them. </span>
        </p>
      </div>
    </section>
    <UPage class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <template #left>
        <div class="mt-8 flex flex-col gap-4">
          <div class="h-8 flex flex-row items-center justify-between">
            <span class="font-semibold"> Filters </span>

            <UButton
              variant="ghost"
              color="gray"
              size="xs"
            >
              Reset
            </UButton>
          </div>

          <div class="flex flex-col gap-6">
            <USelectMenu
              v-model="categorySlug"
              :options="categories"
              placeholder="Categories"
              value-attribute="slug"
              option-attribute="name"
            />

            <USelectMenu
              v-model="moduleSlug"
              :options="modules"
              placeholder="Modules"
              value-attribute="slug"
              option-attribute="name"
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
              :options="pricing"
              placeholder="Pricing"
            >
              <template #option="{ option }">
                <template v-if="option.value === 'free'">
                  <UBadge
                    color="green"
                    variant="subtle"
                  >
                    {{ option.label }}
                  </UBadge>
                </template>
                <template v-else>
                  <UBadge
                    color="yellow"
                    variant="subtle"
                  >
                    {{ option.label }}
                  </UBadge>
                </template>
              </template>
            </USelectMenu>
          </div>
        </div>
      </template>

      <UPageBody>
        <div class="flex flex-row justify-between">
          <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            color="white"
            :trailing="false"
            placeholder="Search..."
          />

          <UButtonGroup>
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

        <div
          id="templates"
          class="mt-6"
        >
          <UCard
            v-if="!templates.length"
            class="dark:bg-opacity-30 dark:bg-gray-800 w-full h-full py-36"
            :ui="{ body: { base: 'flex flex-col justify-center items-center gap-6' } }"
          >
            <p>
              No templates found.
            </p>
            <div class="flex flex-row gap-6">
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
      </UPageBody>
    </UPage>
    <ULandingSection>
      <ULandingFAQ
        :ui="{ wrapper: 'max-w-screen-md mx-auto' }"
        :items="items"
        multiple
      />
    </ULandingSection>
  </div>
</template>
