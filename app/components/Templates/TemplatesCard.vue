<script lang="ts" setup>
import type { Template, Category, User } from '~~/server/utils/drizzle'

const props = withDefaults(defineProps<{
  editable?: boolean
  hash: string
  slug: string
  status?: Template['status']
  featuredImage: string
  title: Template['title']
  shortDescription: Template['shortDescription']
  paidStatus: Template['paidStatus']
  creator: Pick<User, 'login' | 'name' | 'avatarUrl'>
  category: Pick<Category, 'name' | 'slug'>
}>(), { editable: false })

const items = [
  [{
    icon: DOCUMENT_ICON,
    label: 'Edit Content',
    to: `/templates/${props.hash}/edit/content`,
  },
  {
    icon: PHOTO_ICON,
    label: 'Edit Images',
    to: `/templates/${props.hash}/edit/images`,
  }],
]

const categoryName = props.category.name
const categorySlug = props.category.slug

const creatorName = props.creator.name ?? props.creator.login
const creatorAvatarUrl = props.creator.avatarUrl
</script>

<template>
  <UCard
    class="relative group h-full bg-opacity-20 bg-gray-200 hover:ring-primary-500 dark:bg-opacity-20 dark:bg-gray-800 dark:hover:ring-primary-400 hover:ring-2 transition overflow-hidden"
    :ui="{ body: { base: 'h-full flex flex-col', padding: 'px-0 py-0 pb-4 sm:p-0 sm:pb-4' } }"
  >
    <template v-if="editable">
      <TemplatesStatusBadge
        v-if="status"
        :status="status"
        class="absolute z-10 top-2 left-2"
      />
      <UDropdown
        :items="items"
        class="absolute z-10 top-2 right-2 opacity-0 group-hover:opacity-100 transition"
      >
        <UButton
          square
          size="xs"
          :icon="EDIT_ICON"
        />
      </UDropdown>
    </template>
    <div class="relative w-full aspect-video overflow-hidden">
      <img
        :src="getImageURL(featuredImage)"
        width="1920"
        height="1080"
        :alt="`${title} featured image`"
        class="banner w-full aspect-[16/9] transition-transform ease-in rounded-t-lg"
      >
      <dl class="category absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition">
        <div>
          <dt class="sr-only">
            Category
          </dt>
          <dd>
            <UBadge>
              {{ categoryName }}
            </UBadge>
          </dd>
        </div>
      </dl>
    </div>
    <div class="mt-4 px-4 grow flex flex-col">
      <h3 class="title text-lg font-bold">
        <NuxtLink :to="generateShowTemplateURL({ slug, hash, categorySlug: categorySlug })">
          {{ title }}
          <span class="absolute inset-0" />
        </NuxtLink>
      </h3>
      <p class="grow mt-1 text-gray-500 dark:text-gray-400">
        {{ shortDescription }}
      </p>
      <dl class="mt-4 flex flex-row justify-between items-center">
        <div>
          <dt class="sr-only">
            Creator
          </dt>
          <dd class="flex flex-row items-center gap-2">
            <UAvatar
              :src="creatorAvatarUrl"
              :alt="`${creatorName} avatar`"
              size="xs"
            />
            <span class="text-sm">
              {{ creatorName }}
            </span>
          </dd>
        </div>
        <div>
          <dt class="sr-only">
            Price
          </dt>
          <dd>
            <TemplatesPaidStatusBadge :status="paidStatus" />
          </dd>
        </div>
      </dl>
    </div>
  </UCard>
</template>
