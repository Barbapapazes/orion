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
    class="mt-8 flex flex-col gap-8"
  >
    <h1 class="text-3xl font-bold">
      Welcome {{ user.name ?? user.login }}
    </h1>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="order-2 md:order-none flex flex-col md:max-w-xs gap-6">
        <UCard
          class="dark:bg-opacity-20 dark:bg-gray-800"
          :ui="{ body: { base: 'flex flex-row items-center gap-4' } }"
        >
          <UAvatar
            :src="user.avatarUrl"
            :alt="user.name ?? user.login"
            size="lg"
          />
          <div class="flex flex-col">
            <p class="font-semibold">
              {{ user.name ?? user.login }}
            </p>
            <p class="dark:text-gray-400 text-sm">
              {{ user.email }}
            </p>
          </div>
        </UCard>
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
              @click="whatIsTemplateModal = true"
            />
          </UTooltip>
        </div>
      </div>
      <div class="grow flex">
        <UCard
          class="grow dark:bg-opacity-20 dark:bg-gray-800 py-40"
          :ui="{ body: { base: 'h-full flex flex-col justify-center items-center gap-6' } }"
        >
          <p class="text-sm text-center dark:text-gray-400">
            No templates found.
          </p>
          <div class="flex flex-row justify-center items-center gap-2">
            <UButton
              to="/templates/new"
              color="black"
            >
              Submit a template
            </UButton>
            <UTooltip text="Explanation">
              <UButton
                square
                icon="i-heroicons-information-circle"
                color="gray"
                variant="ghost"
                @click="whatIsTemplateModal = true"
              />
            </UTooltip>
          </div>
        </UCard>
      </div>
    </div>

    <UModal v-model="whatIsTemplateModal">
      <UCard
        :ui="{ divide: 'divide-none', body: { base: 'prose dark:prose-invert' }, header: { base: 'flex flex-row items-center justify-between' }, footer: { base: 'flex flex-row items-center justify-between' } }"
      >
        <template #header>
          <h2 class="font-semibold text-lg flex items-center justify-center">
            <UIcon
              name="i-heroicons-information-circle"
              class="mr-2"
            />
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
