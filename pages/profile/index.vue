<script lang="ts" setup>
const { user } = useUserSession()

definePageMeta({
  middleware: ['auth'],
})

const { data: templates } = useFetch(`/api/me/templates`, {
  deep: false,
  default: () => [],
})
const hasTemplates = computed(() => templates.value.length > 0)

const openTemplateExplanations = ref(false)

useSeoMeta({
  title: 'Profile',

})
</script>

<template>
  <UContainer
    v-if="user"
  >
    <UPage>
      <UPageHeader
        :title="`Welcome ${user.name ?? user.login}`"
      />
      <!-- TODO: split into many components -->
      <UPageBody>
        <div class="flex flex-col md:flex-row gap-8">
          <div class="lg:w-4/12 flex flex-col gap-6">
            <ProfileInformations
              :avatar-url="user.avatarUrl"
              :name="user.name ?? user.login"
              :email="user.email"
            />
            <div class="flex flex-row items-center gap-2">
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
                  icon="i-heroicons-information-circle"
                  color="gray"
                  variant="ghost"
                  size="lg"
                  @click="openTemplateExplanations = true"
                />
              </UTooltip>
            </div>
          </div>

          <div class="lg:w-8/12">
            <!-- TODO: add a toolbar to filter by status -->

            <TemplatesGrid
              v-if="hasTemplates"
            >
              <TemplatesCard
                v-for="template in templates"
                :key="template.title"
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
              />
            </TemplatesGrid>
            <ProfileNoTemplates
              v-else
              @info="openTemplateExplanations = true"
            />
          </div>
        </div>
      </UPageBody>
    </UPage>

    <TemplatesExplanations v-model:open="openTemplateExplanations" />
  </UContainer>
</template>
