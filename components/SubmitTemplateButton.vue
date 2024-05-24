<script lang="ts" setup>
const { loggedIn } = useUserSession()

const to = computed(() => loggedIn.value ? '/portal/new' : '/auth/github')
const external = computed(() => !loggedIn.value)
</script>

<template>
  <UButton
    :to="to"
    color="black"
    :external="external"
    @click="logout"
  >
    Submit a template
  </UButton>
</template>
