<script setup>
const { loggedIn, user, clear } = useUserSession()
</script>

<template>
  <div v-if="loggedIn && user">
    <h1>Welcome {{ user.username }}!</h1>
    <img :src="user.avatarUrl" alt="avatar" />
    <NuxtLink to="/admin/categories"> Categories </NuxtLink>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/auth/github">Login with GitHub</a>
  </div>
</template>
