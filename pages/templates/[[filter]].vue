<script setup lang="ts">
const description = 'Discover, search, find and learn from a collection of templates built by the Nuxt community for the Nuxt ecosystem.'
useSeoMeta({
  description,
  ogDescription: description,
})

const route = useRoute()
const filter = route.params.filter as string | undefined || ''

// Pagination
const page = ref(1)
const limit = 12

// Fetch
const { data: templatesPaginated } = await useFetch('/api/templates',
  {
    query: {
      page,
      limit,
    },
    deep: false,
    default: () => ({ data: [], meta: { total: 0, limit: 0 } }),
  })

const templates = computed(() => templatesPaginated.value.data)
const total = computed(() => templatesPaginated.value.meta.total)
const hasTemplates = computed(() => templatesPaginated.value.data.length > 0)
const showPagination = computed(() => total.value > limit)

// Fetch Categories, Modules and KPIs in parallel because they won't change
const { data } = await useAsyncData(async () => {
  const [categories, modules, kpis] = await Promise.all([
    $fetch('/api/categories'),
    $fetch('/api/modules'),
    $fetch('/api/kpis'),
  ])

  return { categories, modules, kpis }
}, { deep: false })
const categories = computed(() => data.value?.categories ?? [])
const modules = computed(() => data.value?.modules ?? [])
const kpis = computed(() => data.value?.kpis ?? {
  templates: { count: 0 },
  categories: { count: 0 },
  creators: { count: 0 },
})
const templatesCount = kpis.value.templates.count
const categoriesCount = kpis.value.categories.count
const creatorsCount = kpis.value.creators.count

// Filters
function someFilter(filter: string, items: { slug: string }[]) {
  return items.some(item => item.slug === filter)
}

const categorySlug = ref<string>('')
const moduleSlug = ref<string>('')
const paidStatus = ref<typeof TEMPLATE_PAID_STATUS[number]>()

if (filter && someFilter(filter, categories.value)) {
  categorySlug.value = filter
}

if (filter && someFilter(filter, modules.value)) {
  moduleSlug.value = filter
}

function onResetFilters() {
  categorySlug.value = ''
  moduleSlug.value = ''
  paidStatus.value = undefined
}

// Toolbar
const search = ref('')
const sort = ref(templateSortOptions[0].value)
const order = ref<1 | -1>(1)
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
          :categories="categories"
          :modules="modules"
          :template-paid-status="TEMPLATE_PAID_STATUS"
        />
      </div>

      <div
        class="grow flex flex-col gap-6"
      >
        <HomeTemplatesToolbar
          v-model:search="search"
          v-model:order="order"
          v-model:sort="sort"
        />
        <template
          v-if="hasTemplates"
        >
          <TemplatesGrid>
            <TemplatesCard
              v-for="template in templates"
              :key="template.title"
              class="w-full"
              :hash="template.hash"
              :slug="template.slug"
              :featured-image="template.featuredImage"
              :title="template.title"
              :short-description="template.shortDescription"
              :paid-status="template.paidStatus"
              :creator="template.creator"
              :category="template.category"
            />
          </TemplatesGrid>

          <div class="mt-8 flex justify-center">
            <UPagination
              v-if="showPagination"
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

<style>
#templates {
  scroll-margin-top: 6rem;
}
</style>
