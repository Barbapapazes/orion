<script setup lang="ts">
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
const { data: modules } = await useFetch('/api/modules', {
  deep: false,
  default: () => [],
  transform: (data) => {
    // Order by type
    return data.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.type.localeCompare(a.type))
  },
})

const templates = []
</script>

<template>
  <div>
    <ULandingHero>
      <template #title>
        Quickly start <br> your <span class="dark:text-[#00dc82]">Nuxt</span> project
      </template>
      <template #description>
        A community-driven collection of templates for your next project, <br> from landing pages to complete web applications.
      </template>
    </ULandingHero>
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
              :options="categories"
              placeholder="Categories"
              by="id"
              option-attribute="name"
            />

            <USelectMenu
              :options="modules"
              placeholder="Modules"
              by="id"
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

        <div class="mt-6">
          <div
            v-if="!templates.length"
            class="w-full h-full flex flex-col items-center justify-center gap-6 py-36"
          >
            <p>
              No templates found.
            </p>
            <div class="flex flex-row gap-6">
              <UButton
                to="/auth/github"
                external
                size="sm"
                color="black"
              >
                Submit a template
              </UButton>
              <UButton
                variant="ghost"
                color="gray"
              >
                Reset filters
              </UButton>
            </div>
          </div>
        </div>
      </UPageBody>
    </UPage>
  </div>
</template>
