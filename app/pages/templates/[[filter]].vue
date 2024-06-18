<script setup lang="ts">
import type { TemplatePaidStatus } from '~/types'

const description = 'Discover, search, find and learn from a collection of templates built by the Nuxt community for the Nuxt ecosystem.'
useSeoMeta({
  description,
  ogDescription: description,
})

const route = useRoute()
const filter = route.params.filter as string | undefined || ''

const [categories, modules, kpis] = await Promise.all([
  useFetchCategories(),
  useFetchModules(),
  useFetchKpis(),
])
const templatesCount = kpis.value!.templates.count
const categoriesCount = kpis.value!.categories.count
const creatorsCount = kpis.value!.creators.count

// Filters
const categorySlug = ref<string | undefined>(undefined)
const moduleSlug = ref<string | undefined>(undefined)
const paidStatus = ref<TemplatePaidStatus | undefined>(undefined)

function onResetFilters() {
  categorySlug.value = ''
  moduleSlug.value = ''
  paidStatus.value = undefined
}

// Apply initial filters
function someFilter(filter: string, items: { slug: string }[]) {
  return items.some(item => item.slug === filter)
}

if (filter && someFilter(filter, categories.value!)) {
  categorySlug.value = filter
}

if (filter && someFilter(filter, modules.value!)) {
  moduleSlug.value = filter
}

// Pagination
const page = ref(1)

// Toolbar
const search = ref('')
const searchDebounce = useDebounce(search, 300)
const orderBy = ref(templateSortOptions[0].value)
const order = ref<'desc' | 'asc'>('asc')

// Fetch
const { data } = await useFetch('/api/templates',
  {
    query: {
      page,
      search: searchDebounce,
      orderBy,
      order,
      categorySlug,
      moduleSlug,
      paidStatus,
      status: 'validated',
    },
    deep: false,
    default: () => (emptyPagination),
  })

const meta = computed(() => data.value.meta)
const total = computed(() => meta.value.total)
const limit = computed(() => meta.value.limit)

const templates = computed(() => data.value.data)
const hasTemplates = computed(() => templates.value.length > 0)
const hasMoreTemplates = computed(() => total.value > limit.value)

// View Transition API
const active = useActiveTemplateCard()
</script>

<template>
  <div>
    <HomeHero />
    <HomeKPI>
      <HomeKPIItem :value="templatesCount">
        {{ templatesCount > 1 ? 'Templates' : 'Template' }} available and ready to use across {{ categoriesCount }} {{ categoriesCount > 1 ? 'categories' : 'category' }}.
      </HomeKPIItem>
      <HomeKPIItem :value="creatorsCount">
        {{ creatorsCount > 1 ? 'Creators' : 'Creator' }} share their creations to
        help you start your project.
      </HomeKPIItem>
    </HomeKPI>

    <UContainer class="py-24 sm:py-32 md:py-40 flex flex-col md:flex-row gap-6 md:gap-8">
      <div class="w-full md:max-w-56">
        <HomeTemplatesFilters
          v-model:category-slug="categorySlug"
          v-model:module-slug="moduleSlug"
          v-model:paid-status="paidStatus"
          class="sticky top-20"
          :categories="categories!"
          :modules="modules!"
          :template-paid-status="templatePaidStatusOptions"
          @reset="onResetFilters"
        />
      </div>

      <div
        class="grow flex flex-col gap-6"
      >
        <HomeTemplatesToolbar
          v-model:search="search"
          v-model:order="order"
          v-model:order-by="orderBy"
        />
        <template
          v-if="hasTemplates"
        >
          <TemplatesGrid id="templates">
            <TemplatesCard
              v-for="template in templates"
              :key="template.hash"
              class="w-full"
              :class="{ active: active === template.hash }"
              :hash="template.hash"
              :slug="template.slug"
              :featured-image="template.featuredImage"
              :title="template.title"
              :short-description="template.shortDescription"
              :paid-status="template.paidStatus"
              :creator="template.creator"
              :category="template.category"
              @click.native="active = template.hash"
            />
          </TemplatesGrid>

          <div class="mt-8 flex justify-center">
            <UPagination
              v-if="hasMoreTemplates"
              v-model="page"
              :page-count="limit"
              :total="total"
            />
          </div>
        </template>
        <HomeTemplatesEmpty
          v-else
          @reset-filters="onResetFilters"
        />
      </div>
    </UContainer>

    <HomeFAQ />
  </div>
</template>

<style scoped>
.active :deep(.banner) {
  view-transition-name: selected-template;
}
</style>
