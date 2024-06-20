<script lang="ts" setup>
const route = useRoute()
const hash = computed(() => {
  return (route.params.slug as string).slice(-12)
})

const template = await useFetchTemplate(hash)

if (!template.value) {
  throw templateNotFoundError
}

const templateTitle = template.value.title
const templateSlug = template.value.slug
const templateHash = template.value.hash
const templateShortDescription = template.value.shortDescription
const templateDescription = template.value.description
const isPremium = template.value.paidStatus === 'premium'

const categoryName = template.value.category.name
const categorySlug = template.value.category.slug

const creatorName = template.value.creator.name || template.value.creator.login
const creatorLogin = template.value.creator.login
const creatorAvatarUrl = template.value.creator.avatarUrl

const images = [
  getImageURL(template.value.featuredImage),
  ...(template.value.additionalImages ?? []).map(image => getImageURL(image)),
]

useSeoMeta({
  title: `${templateTitle} by ${creatorName}`,
  description: template.value.shortDescription,
})
</script>

<template>
  <UContainer
    v-if="template"
    class="mt-8"
  >
    <Can
      :bouncer-ability="viewNonPublicTemplate"
      :args="[template]"
    >
      <TemplatesStatusAlert
        :id="template.id"
        class="mb-8 sticky top-20 z-10"
        :status="template.status"
      />
    </Can>

    <TemplatesBreadcrumb
      :template-title="templateTitle"
      :category-name="categoryName"
      :category-slug="categorySlug"
    />

    <TemplatesCarousel
      class="banner"
      :template-title="templateTitle"
      :images="images"
    />

    <UPage>
      <UPageHeader
        :title="templateTitle"
        :description="templateShortDescription"
        :ui="{ links: 'gap-4' }"
      >
        <template #links>
          <UButton
            :label="isPremium ? 'Buy Now' : 'Get Started'"
            color="primary"
            rel="noopener noreferrer external"
            :to="template.accessUrl"
            target="_blank"
            :trailing-icon="EXTERNAL_LINK_ICON"
            size="md"
          />
          <UButton
            v-if="template.liveUrl"
            label="Live Demo"
            color="white"
            :to="template.liveUrl"
            target="_blank"
            rel="noopener noreferrer external"
            :trailing-icon="EXTERNAL_LINK_ICON"
            size="lg"
          />
          <Can
            :bouncer-ability="editTemplate"
            :args="[template]"
          >
            <TemplatesEditDropdown
              :template-slug="templateSlug"
              :template-hash="templateHash"
              :category-slug="categorySlug"
            />
          </Can>
        </template>
      </UPageHeader>

      <div class="flex flex-col md:flex-row gap-x-16">
        <UPageBody class="order-2 md:order-1 md:w-7/12 lg:w-9/12">
          <div
            class="prose dark:prose-invert max-w-none"
          >
            <div
              v-if="templateDescription"
              v-html="templateDescription"
            />
            <p v-else>
              <em>No description provided.</em>
            </p>
          </div>
        </UPageBody>

        <div class="order-1 lg:order-2 md:w-5/12 lg:w-3/12">
          <dl class="mt-8 flex flex-col gap-6">
            <div class="flex items-center gap-4">
              <dt class="text-sm text-gray-500 dark:text-gray-400">
                Cost
              </dt>
              <div
                class="h-1 grow border-t border-gray-200 dark:border-gray-800"
              />
              <dd>
                <TemplatesPaidStatusBadge
                  :status="template.paidStatus"
                  size="lg"
                />
              </dd>
            </div>
            <div class="flex items-center gap-4">
              <dt class="text-sm text-gray-500 dark:text-gray-400">
                Category
              </dt>
              <div
                class="h-1 grow border-t border-gray-200 dark:border-gray-800"
              />
              <dd>
                <UBadge
                  variant="subtle"
                  size="lg"
                >
                  {{ categoryName }}
                </UBadge>
              </dd>
            </div>
            <div class="flex items-center gap-4">
              <dt class="text-sm text-gray-500 dark:text-gray-400">
                Creator
              </dt>
              <div
                class="h-1 grow border-t border-gray-200 dark:border-gray-800"
              />
              <dd>
                <UButton
                  :to="`https://github.com/${creatorLogin}`"
                  rel="noopener noreferrer external"
                  :label="creatorName"
                  color="gray"
                  target="_blank"
                >
                  <template #leading>
                    <UAvatar
                      :src="creatorAvatarUrl"
                      :alt="`${creatorName} avatar`"
                      size="xs"
                    />
                  </template>
                </UButton>
              </dd>
            </div>
            <template
              v-if="template.modules.length > 0"
            >
              <UDivider class="my-2" />
              <div class="flex flex-col gap-4">
                <dt class="text-sm text-gray-500 dark:text-gray-400">
                  Modules
                </dt>
                <dd>
                  <ul class="grid grid-cols-2 md:grid-cols-1 items-center gap-4 lg:gap-y-2">
                    <li
                      v-for="item in template.modules"
                      :key="item.module.name"
                    >
                      <NuxtLink
                        :to="`https://nuxt.com/modules/${item.module.slug}`"
                        rel="noopener noreferrer external"
                        target="_blank"
                        class="flex flex-row items-center gap-2"
                      >

                        <img
                          :src="`${MODULE_ICON_PREFIX}/${item.module.icon}`"
                          :alt="`${item.module.name} icon`"
                          class="w-8 h-8"
                        >
                        <span>
                          {{ item.module.name }}
                        </span>
                      </NuxtLink>
                    </li>
                  </ul>
                </dd>
              </div>
            </template>
          </dl>
        </div>
      </div>
    </UPage>
  </UContainer>
</template>

<style scoped>
.banner :deep(:first-of-type > img) {
  view-transition-name: selected-template;
}
</style>
