<script lang="ts" setup>
const links = [{
  id: 'admin',
  label: 'Admin',
  icon: 'i-heroicons-home',
  to: '/admin',
  tooltip: {
    text: 'Admin',
  },
}, {
  id: 'categories',
  label: 'Categories',
  icon: 'i-heroicons-tag',
  to: '/admin/categories',
  tooltip: {
    text: 'Categories',
  },
}, {
  id: 'modules',
  label: 'Modules',
  icon: 'i-heroicons-archive-box',
  to: '/admin/modules',
  tooltip: {
    text: 'Modules',
  },
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-heroicons-user-group',
  to: '/admin/users',
  tooltip: {
    text: 'Users',
  },
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <NuxtLink to="/">
            Orion
          </NuxtLink> Dashboard
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
