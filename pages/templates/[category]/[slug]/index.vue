<script lang="ts" setup>
const route = useRoute()
const hash = computed(() => {
  return (route.params.slug as string).slice(-12)
})
const { data: template } = await useFetch(`/api/templates/${hash.value}`, {
  deep: false,
  default: () => {},
})

if (!template.value) {
  throw createError({
    statusCode: 404,
    message: 'Template not found',
    fatal: true,
  })
}

const isPremium = template.value.paidStatus === 'premium'

const categoryName = template.value.category.name
const creatorName = template.value.creator.name || template.value.creator.login
const creatorAvatarUrl = template.value.creator.avatarUrl

const items = [[{
  label: 'Edit Content',
  icon: 'i-heroicons-pencil',
  to: generateEditTextTemplateURL({
    slug: template.value.slug,
    hash: template.value.hash,
    categorySlug: template.value.category.slug,
  }),
}, {
  label: 'Edit Images',
  icon: 'i-heroicons-photo',
  to: generateEditImagesTemplateURL({
    slug: template.value.slug,
    hash: template.value.hash,
    categorySlug: template.value.category.slug,
  }),
}]]

useSeoMeta({
  title: template.value.title,
  description: template.value.shortDescription,
})
</script>

<template>
  <UContainer
    v-if="template"
  >
    <img
      width="1920"
      height="1080"
      :src="template.featuredImage"
      :alt="`${template.title} featured image`"
      class="mt-8 rounded-xl w-full aspect-video"
    >
    <UPage>
      <UPageHeader
        :title="template.title"
        :description="template.shortDescription"
        :ui="{ links: 'gap-4' }"
      >
        <template #links>
          <UButton
            :label="isPremium ? 'Buy Now' : 'Get Started'"
            color="primary"
            rel="noopener noreferrer external"
            :to="template.accessUrl"
            target="_blank"
            trailing-icon="i-heroicons-arrow-top-right-on-square"
            size="md"
          />
          <UButton
            v-if="template.liveUrl"
            label="Live Demo"
            color="white"
            :to="template.liveUrl"
            target="_blank"
            rel="noopener noreferrer external"
            trailing-icon="i-heroicons-arrow-top-right-on-square"
            size="md"
          />
          <UDropdown
            :items="items"
          >
            <UButton
              color="gray"
              square
              icon="i-heroicons-ellipsis-horizontal"
              aria-label="Edit"
            />
          </UDropdown>
        </template>
      </UPageHeader>

      <div class="flex">
        <UPageBody class="w-9/12">
          <div
            class="prose dark:prose-invert"
            v-html="template.description"
          />
        </UPageBody>

        <div class="w-3/12">
          <dl class="mt-8 flex flex-col gap-6">
            <div class="flex justify-between items-center">
              <dt class="text-sm dark:text-gray-500">
                Cost
              </dt>
              <dd>
                <PaidStatusBadge
                  :status="template.paidStatus"
                  size="lg"
                />
              </dd>
            </div>
            <div class="flex justify-between items-center">
              <dt class="text-sm dark:text-gray-500">
                Category
              </dt>
              <dd>
                <UBadge
                  variant="subtle"
                  size="lg"
                >
                  {{ categoryName }}
                </UBadge>
              </dd>
            </div>
            <div class="flex justify-between items-center">
              <dt class="text-sm dark:text-gray-500">
                Creator
              </dt>
              <dd>
                <NuxtLink
                  :to="`https://github.com/${creatorName}`"
                  rel="noopener noreferrer external"
                  target="_blank"
                  class="flex flex-row items-center gap-2"
                >
                  <UAvatar
                    :src="creatorAvatarUrl"
                    :alt="`${creatorName} avatar`"
                    size="sm"
                  />
                  <span>
                    {{ creatorName }}
                  </span>
                </NuxtLink>
              </dd>
            </div>
            <UDivider />
            <div class="flex flex-col gap-4">
              <dt class="text-sm dark:text-gray-500">
                Modules
              </dt>
              <dd>
                <ul class="flex flex-col gap-2">
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
          </dl>
        </div>
      </div>
    </UPage>
  </UContainer>
</template>
