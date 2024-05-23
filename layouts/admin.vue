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
}, {
  id: 'modules',
  label: 'Modules',
  icon: 'i-heroicons-archive-box',
  to: '/admin/modules',
}, {
  id: 'templates',
  label: 'Templates',
  icon: 'i-heroicons-rectangle-group',
  to: '/admin/templates',
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-heroicons-user-group',
  to: '/admin/users',
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
