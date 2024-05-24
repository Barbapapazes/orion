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
    <UHeader title="Orion">
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
  </div>
</template>
