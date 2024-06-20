<script lang="ts" setup>
import type { User } from '#auth-utils'

const { user, loggedIn, clear } = useUserSession()

const appConfig = useAppConfig()
const socials = appConfig.socials

const items = [[{
  label: 'Profile',
  icon: USER_ICON,
  to: '/profile',
}], [{
  label: 'Sign out',
  icon: SIGN_OUT_ICON,
  click: async () => {
    await clear()
    navigateTo('/templates')
  },
}]]

const accessAdmin = defineAbility((user: User) => {
  return user.roleType === 'admin'
})

if (await allows(accessAdmin)) {
  // @ts-expect-error No types for this yet
  items[0].push({
    label: 'Admin',
    icon: ADMIN_ICON,
    to: '/admin',
  })
}
</script>

<template>
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
        Submit a template
      </UButton>
      <UDropdown
        v-else-if="user"
        :items="items"
      >
        <template #default="{ open }">
          <UButton
            variant="ghost"
            color="gray"
            :class="[open && 'bg-gray-50 bg-gray-200 dark:bg-gray-800']"
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
      </UDropdown>
    </template>
  </UHeader>
</template>
