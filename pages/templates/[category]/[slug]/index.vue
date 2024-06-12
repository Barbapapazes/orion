<script lang="ts" setup>
import type { User } from '#auth-utils'
import type { UCarousel } from '#components'

const route = useRoute()
const hash = computed(() => {
  return (route.params.slug as string).slice(-12)
})
const { data: template, error } = await useFetch(`/api/templates/${hash.value}`, {
  deep: false,
  default: () => {},
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    message: error.value.message,
    fatal: true,
  })
}

if (!template.value) {
  throw createError({
    statusCode: 404,
    message: 'Template not found',
    fatal: true,
  })
}

const breadcrumbLinks = [{
  label: 'Templates',
  icon: TEMPLATE_ICON,
  to: '/templates#templates',
},
{
  label: template.value.category.name,
  icon: CATEGORY_ICON,
  to: `/templates/${template.value.category.slug}#templates`,
},
{
  label: template.value.title,
}]

const isPremium = template.value.paidStatus === 'premium'
const hasAdditionalImages = (template.value.additionalImages?.length ?? 0) > 0

const categoryName = template.value.category.name
const creatorName = template.value.creator.name || template.value.creator.login
const creatorLogin = template.value.creator.login
const creatorAvatarUrl = template.value.creator.avatarUrl
const images = [
  getImageURL(template.value.featuredImage),
  ...(template.value.additionalImages ?? []).map(image => getImageURL(image)),
]

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

const editTemplate = defineAbility((user: User, template: Pick<Template, 'creatorId'>) => {
  if (user.roleType === 'admin') {
    return true
  }

  if (template && user.id === template.creatorId) {
    return true
  }

  return false
})

const viewNonPublicTemplate = defineAbility((user: User, template: Pick<Template, 'creatorId' | 'status'>) => {
  if (template.status === 'validated') {
    return false // If the template is validated, it's public.
  }

  if (user.roleType === 'admin' || user.id === template.creatorId) {
    return true
  }

  return false
})

useSeoMeta({
  title: `${template.value.title} by ${creatorName}`,
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

    <UBreadcrumb :links="breadcrumbLinks" />

    <UCarousel
      v-slot="{ item }"
      class="mt-8"
      :items="images"
      :ui="{ wrapper: 'group', item: 'aspect-[16/9] w-full rounded-2xl overflow-hidden', indicators: { wrapper: 'opacity-0 group-hover:opacity-100 transition', inactive: 'mix-blend-normal' }, default: { prevButton: { class: 'rtl:[&_span:first-child]:rotate-180 absolute left-0 opacity-0 disabled:opacity-0 top-1/2 transform -translate-y-1/2 rounded-full group-hover:opacity-100 group-hover:disabled:opacity-75 group-hover:left-4 transition-all' }, nextButton: { class: 'rtl:[&_span:last-child]:rotate-180 absolute right-0 opacity-0 disabled:opacity-0 top-1/2 transform -translate-y-1/2 rounded-full group-hover:opacity-100 group-hover:disabled:opacity-75 group-hover:right-4 transition-all' } } }"
      :arrows="hasAdditionalImages"
      :indicators="hasAdditionalImages"
      :prev-button="{
        color: 'gray',
      }"
      :next-button="{
        color: 'gray',
      }"
    >
      <img
        :src="item"
        :alt="`${template.title} image`"
        width="1920"
        height="1080"
        class="w-full aspect-[16/9] object-cover object-center"
        draggable="false"
      >
    </UCarousel>
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
          <Can
            :bouncer-ability="editTemplate"
            :args="[template]"
          >
            <UDropdown
              :items="items"
            >
              <UButton
                color="gray"
                square
                icon="i-heroicons-ellipsis-horizontal"
                aria-label="Edit"
                size="md"
              />
            </UDropdown>
          </Can>
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
            <div class="flex items-center gap-4">
              <dt class="text-sm dark:text-gray-400">
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
              <dt class="text-sm dark:text-gray-400">
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
              <dt class="text-sm dark:text-gray-400">
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
            </template>
          </dl>
        </div>
      </div>
    </UPage>
  </UContainer>
</template>
