<script lang="ts" setup>
const { user, loggedIn } = useUserSession()

const socials = [{
  title: 'X',
  icon: 'i-simple-icons-x',
  to: 'https://x.soubiran.dev',
  target: '_blank',
}, {
  title: 'GitHub',
  icon: 'i-simple-icons-github',
  to: 'https://gh.soubiran.dev',
  target: '_blank',
}]
</script>

<template>
  <div>
    <UHeader
      title="Orion"
      to="/templates"
    >
      <template #right>
        <UButton
          v-for="social in socials"
          :key="social.title"
          v-bind="social"
          square
          variant="ghost"
          color="gray"
        />
        <UButton
          v-if="!loggedIn"
          to="/auth/github"
          external
          color="black"
        >
          {{ text }}
        </UButton>
        <UButton
          v-else
          to="/portal"
          variant="ghost"
          color="gray"
        >
          <template #leading>
            <UAvatar
              :src="user.avatarUrl"
              size="2xs"
            />
          </template>
          {{ user.name ?? user.login }}
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <UFooter
      class="py-12"
      :ui="{ bottom: { container: 'flex flex-col lg:flex-row lg:items-start', left: 'mt-0', right: 'mt-12 order-3 lg:mt-0 flex flex-col justify-center lg:items-end lg:justify-start gap-2', center: 'mt-0' } }"
    >
      <template #left>
        <div class="flex flex-col gap-2">
          <p class="font-bold">
            Orion
          </p>
          <p class="italic opacity-60 text-sm max-w-sm">
            <em>
              Discover, search, find and learn for a collection of templates built by the community for the Nuxt ecosystem.
            </em>
          </p>
        </div>
      </template>
      <template #right>
        <div class="flex flex-row gap-.5">
          <UButton
            v-for="social in socials"
            :key="social.title"
            v-bind="social"
            square
            variant="ghost"
            color="gray"
          />
        </div>
        <p class="italic text-sm opacity-60 text-right">
          Built by <a
            href="https://soubiran.dev"
            target="_blank"
          >Estéban (Barbapapazes) S</a>
        </p>
      </template>
    </UFooter>
  </div>
</template>
