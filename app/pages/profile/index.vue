<script lang="ts" setup>
import type { TemplatePaidStatus, TemplateStatus } from '~~/types'

definePageMeta({
  middleware: ['auth'],
})

const openTemplateExplanations = ref(false)

const { user } = useUserSession()

const page = ref(1)
const status = ref<TemplateStatus | undefined>()
const paidStatus = ref<TemplatePaidStatus | undefined>()

const { data } = useFetch(`/api/me/templates`, {
  query: { page, status, paidStatus },
  deep: false,
  default: () => {
    return { data: [], meta: { total: 0, limit: 0, page: 0 } }
  },
})

const meta = computed(() => data.value.meta)
const templates = computed(() => data.value.data)
const hasTemplates = computed(() => templates.value.length > 0)
const hasMorePages = computed(() => meta.value.total > meta.value.limit)

useSeoMeta({
  title: 'Profile',
})

// View Transition API
const active = useActiveTemplateCard()
</script>

<template>
  <UContainer
    v-if="user"
  >
    <UPage>
      <UPageHeader
        :title="`Welcome ${user.name ?? user.login}`"
      />
      <UPageBody>
        <div class="flex flex-col md:flex-row gap-8">
          <div class="lg:w-3/12 flex flex-col">
            <div class="h-8">
              <h2 class="text-lg font-semibold">
                Profile
              </h2>
            </div>

            <ProfileInformations
              class="mt-4"
              :avatar-url="user.avatarUrl"
              :name="user.name ?? user.login"
              :email="user.email"
            />
            <div class="mt-6 flex flex-row items-center gap-2">
              <UButton
                :ui="{ base: 'grow justify-center' }"
                to="/templates/new"
                color="black"
                size="lg"
              >
                Submit a template
              </UButton>
              <UTooltip text="Explanation">
                <UButton
                  square
                  :icon="INFORMATION_CIRCLE_ICON"
                  color="gray"
                  variant="ghost"
                  size="lg"
                  @click="openTemplateExplanations = true"
                />
              </UTooltip>
            </div>
          </div>

          <div class="lg:w-9/12 grow flex flex-col gap-4">
            <ProfileToolbar
              v-model:status="status"
              v-model:paid-status="paidStatus"
              :badge="meta.total"
            />

            <TemplatesGrid
              v-if="hasTemplates"
            >
              <TemplatesCard
                v-for="template in templates"
                :key="template.title"
                :class="{ active: active === template.hash }"
                editable
                :slug="template.slug"
                :hash="template.hash"
                :status="template.status"
                :featured-image="template.featuredImage"
                :title="template.title"
                :short-description="template.shortDescription"
                :paid-status="template.paidStatus"
                :creator="template.creator"
                :category="template.category"
                @click.native="active = template.hash"
              />
            </TemplatesGrid>
            <ProfileNoTemplates
              v-else
              @info="openTemplateExplanations = true"
            />

            <div
              v-if="hasMorePages"
              class="mt-8 flex justify-center"
            >
              <UPagination
                v-model="page"
                :page-count="meta.limit"
                :total="meta.total"
              />
            </div>
          </div>
        </div>
      </UPageBody>
    </UPage>

    <TemplatesExplanations v-model:open="openTemplateExplanations" />
  </UContainer>
</template>

<style scoped>
.active :deep(.banner) {
  view-transition-name: selected-template;
}
</style>
