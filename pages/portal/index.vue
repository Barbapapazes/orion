<script lang="ts" setup>
const { user, clear } = useUserSession()

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Portal',
})

async function logout() {
  await clear()
  navigateTo('/')
}

// fetch les templates
// afficher les templates
// si pas de templates, afficher un message
</script>

<template>
  <UContainer v-if="user">
    <UPage>
      <UPageHeader
        :ui="{ wrapper: 'border-none pb-0' }"
        :title="`Welcome ${user.name ?? user.login}`"
      />
      <UPageBody :ui="{ wrapper: 'flex flex-row gap-8' }">
        <UCard :ui="{ base: 'w-full max-w-xs', footer: { base: 'flex flex-row justify-between' } }">
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

          <template #footer>
            <UButton
              variant="outline"
              color="red"
              @click="logout"
            >
              Logout
            </UButton>

            <UButton
              to="/portal/new"
              color="black"
              @click="logout"
            >
              Submit a template
            </UButton>
          </template>
        </UCard>
        <UPageGrid>
          coucou
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
