<script lang="ts" setup>
import type { Button } from '#ui/types'
// const route = useRoute()
// const hash = computed(() => {
//   return (route.params.slug as string).slice(-12)
// })
// const { data: template } = await useFetch(`/api/templates/${hash.value}`, {
//   deep: false,
//   default: () => {},
// })
const template = {
  featuredImageUrl: 'https://github.com/Barbapapazes/the-green-chronicle/assets/45267552/d6df661f-1cfc-4f4e-bc0c-d97480d0a885',
  title: 'The Green Chronicle',
  shortDescription: 'A Nuxt Studio theme powered by Nuxt UI Pro for your corporate blog.',
  description: '<p>The Green Chronicle is a Nuxt Studio theme powered by Nuxt UI Pro for your corporate blog.</p><ul><li>Content module</li><li>SEO module</li></ul>',
  category: {
    name: 'Blog',
    slug: 'blog',
  },
  modules: [
    {
      name: 'Content',
      slug: 'content',
      icon: 'nuxt.svg',
    },
    {
      name: 'SEO',
      slug: 'seo',
      icon: 'algolia.svg',
    },
  ],
  paidStatus: 'premium' as typeof PAID_STATUS[number],
  liveUrl: 'https://the-green-chronicle.esteban-soubiran.site',
  accessUrl: 'https://github.com/barbapapazes/the-green-chronicle',
  creator: {
    name: 'Barbapapazes',
    avatarUrl: 'https://github.com/barbapapazes.png',
  },
}

const links: Button[] = [{ label: template.paidStatus !== 'premium' ? 'Get Started' : 'Buy Now', rel: 'noopener noreferrer external', color: 'primary', to: template.accessUrl, target: '_blank', trailingIcon: 'i-heroicons-arrow-top-right-on-square-20-solid', size: 'md' }]
if (template.liveUrl) {
  links.push({ label: 'Live Demo', color: 'white', to: template.liveUrl, target: '_blank', rel: 'noopener noreferrer external', trailingIcon: 'i-heroicons-arrow-top-right-on-square-20-solid', size: 'md' })
}

const categoryName = template.category.name
const creatorName = template.creator.name
const creatorAvatarUrl = template.creator.avatarUrl
</script>

<template>
  <UContainer
    v-if="template"
  >
    <img
      width="1920"
      height="1080"
      :src="template.featuredImageUrl"
      :alt="`${template.title} featured image`"
      class="mt-8 rounded-xl w-full aspect-video"
    >
    <UPage>
      <UPageHeader
        :title="template.title"
        :description="template.shortDescription"
        :links="links"
        :ui="{ links: 'gap-4' }"
      />

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
                    :key="item.name"
                  >
                    <NuxtLink
                      :to="`https://nuxt.com/modules/${item.slug}`"
                      rel="noopener noreferrer external"
                      target="_blank"
                      class="flex flex-row items-center gap-2"
                    >

                      <img
                        :src="`${MODULE_ICON_PREFIX}/${item.icon}`"
                        :alt="`${item.name} icon`"
                        class="w-8 h-8"
                      >
                      <span>
                        {{ item.name }}
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
