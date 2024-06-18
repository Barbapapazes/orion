<script lang="ts" setup>
import type { UserRoleType } from '~/types'

const props = defineProps<{
  roleType: UserRoleType
}>()

const color = computed(() => {
  switch (props.roleType) {
    case 'admin':
      return 'red'
    case 'creator':
      return 'green'
    case 'banned':
      return 'orange'
    default:
      return ''
  }
})

const label = computed(() => {
  return userRoleTypeOptions.find(option => option.value === props.roleType)?.label
})
</script>

<template>
  <UBadge
    :color="color"
    variant="subtle"
  >
    {{ label }}
  </UBadge>
</template>
