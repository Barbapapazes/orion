<script lang="ts" setup>
const links = [{
  id: 'admin',
  label: 'Admin',
  icon: 'i-heroicons-home',
  to: '/admin',
  tooltip: {
    text: 'Admin',
  }
}, {
  id: 'categories',
  label: 'Categories',
  icon: 'i-heroicons-tag',
  to: '/admin/categories',
  tooltip: {
    text: 'Categories',
  }
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-heroicons-user-group',
  to: '/admin/users',
  tooltip: {
    text: 'Users',
  }
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
