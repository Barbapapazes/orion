<script lang="ts" setup>
const { user } = useUserSession()

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Profile',
})

const whatIsTemplateModal = ref(false)

const templates = []
// fetch les templates
// afficher les templates
// si pas de templates, afficher un message
</script>

<template>
  <UContainer
    v-if="user"
    class="grow flex"
  >
    <UPage
      class="grow"
      :ui="{ wrapper: 'justify-items-stretch' }"
    >
      <UPageHeader
        :ui="{ wrapper: 'border-none pb-0' }"
        :title="`Welcome ${user.name ?? user.login}`"
      />
      <UPageBody :ui="{ wrapper: 'grow h-full flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-8' }">
        <div class="order-2 lg:order-none lg:grow lg:max-w-xs flex flex-col gap-6">
          <UCard
            class="dark:bg-opacity-30 dark:bg-gray-800"
            :ui="{ body: { base: 'flex flex-col items-center lg:block' } }"
          >
            <UAvatar
              :src="user.avatarUrl"
              :alt="user.name ?? user.login"
              size="3xl"
            />
            <p class="mt-2 font-semibold">
              {{ user.name ?? user.login }}
            </p>
            <p class="opacity-60">
              {{ user.email }}
            </p>
          </UCard>
          <UButton
            :ui="{ base: 'justify-center' }"
            to="/templates/new"
            color="black"
            size="lg"
          >
            Submit a template
          </UButton>
        </div>
        <UPageGrid :ui="{ wrapper: 'grow' }">
          <UCard
            v-if="!templates.length"
            class="dark:bg-opacity-30 dark:bg-gray-800 sm:col-span-2 sm:row-span-2 xl:col-span-3 xl:row-span-3 flex flex-col items-center justify-center lg:h-1/2"
            :ui="{ body: { base: 'flex flex-col justify-center items-center gap-8' } }"
          >
            <p class="text-center">
              <span>
                No templates found.
              </span>
              <br>
              <span>
                Submit a template to get started.
              </span>
            </p>
            <div class="flex flex-col justify-center items-center gap-2">
              <UButton
                to="/templates/new"
                color="black"
              >
                Submit a template
              </UButton>
              <UButton
                variant="link"
                color="gray"
                size="xs"
                @click="whatIsTemplateModal = true"
              >
                What is a template?
              </UButton>
            </div>
          </UCard>
        </UPageGrid>
      </UPageBody>
    </UPage>

    <UModal v-model="whatIsTemplateModal">
      <UCard
        :ui="{ divide: 'divide-none', body: { base: 'prose dark:prose-invert' }, header: { base: 'flex flex-row items-center justify-between' }, footer: { base: 'flex flex-row items-center justify-between' } }"
      >
        <template #header>
          <h2 class="font-semibold text-lg">
            What is a template?
          </h2>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="whatIsTemplateModal = false"
          />
        </template>

        <p>
          A template is a sample of an website or webapp with some details already in place. In the case of Orion, template are built around <a
            href="https://nuxt.com"
            target="_blank"
            rel="noopener noreferrer"
          >Nuxt</a> technology and can be both a theme or a starter.
        </p>
        <p>
          The idea is to help the Nuxt community to kickstart their project with a solid base. So Orion is that place where Nuxt developers can discover, search, find and learn from a collection of templates built by the community for the Nuxt ecosystem.
        </p>
        <p>
          If you have built a template, free or paid, you can submit it to Orion and share it with the community. Orion is a great place to showcase your work and get feedback from the community.
        </p>
        <p>
          With Orion, you can easily access to source code to deep dive into the template and learn from it. You can also fork the template to start your project from it if the project permits it.
        </p>
        <p>
          Happy coding! 🚀
        </p>
        <template #footer>
          <UButton
            color="black"
            variant="ghost"
            to="/templates#templates"
          >
            Browse templates
          </UButton>
          <UButton
            color="black"
            to="/templates/new"
          >
            Submit a template
          </UButton>
        </template>
      </UCard>
    </UModal>
  </UContainer>
</template>

<style scoped>
/* Remove margin top to first prose paragraph and margin bottom from last paragraph. */
.prose p:first-of-type {
  margin-top: 0;
}

.prose p:last-of-type {
  margin-bottom: 0;
}
</style>
