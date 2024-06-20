<script lang="ts" setup>
const links = [{
  id: 'admin',
  label: 'Admin',
  icon: HOME_ICON,
  to: '/admin',
  tooltip: {
    text: 'Admin',
  },
}, {
  id: 'categories',
  label: 'Categories',
  icon: CATEGORY_ICON,
  to: '/admin/categories',
}, {
  id: 'modules',
  label: 'Modules',
  icon: MODULE_ICON,
  to: '/admin/modules',
}, {
  id: 'templates',
  label: 'Templates',
  icon: TEMPLATE_ICON,
  to: '/admin/templates',
}, {
  id: 'users',
  label: 'Users',
  icon: USERS_ICON,
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
        :ui="{ left: 'flex-1 items-center' }"
      >
        <template #left>
          <NuxtLink to="/templates">
            Orion
          </NuxtLink> Dashboard
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />

        <template #footer>
          <AdminUserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
