<script lang="ts" setup>
import type { TemplatePaidStatus } from '~/types'

const props = defineProps<{
  status: TemplatePaidStatus
}>()

const color = computed(() => {
  switch (props.status) {
    case 'free':
      return 'green'
    case 'freemium':
      return 'blue'
    case 'premium':
      return 'yellow'
    default:
      return ''
  }
})

const label = computed(() => {
  return templatePaidStatusOptions.find(option => option.value === props.status)?.label
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
