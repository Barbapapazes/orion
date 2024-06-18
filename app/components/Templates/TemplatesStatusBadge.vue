<script lang="ts" setup>
import type { TemplateStatus } from '~/types'

const props = defineProps<{
  status: TemplateStatus
}>()

const color = computed(() => {
  switch (props.status) {
    case 'submitted':
      return 'blue'
    case 'reviewed':
      return 'violet'
    case 'refused':
      return 'red'
    case 'validated':
      return 'green'
    default:
      return ''
  }
})

const label = computed(() => {
  return templateStatusOptions.find(option => option.value === props.status)?.label
})
</script>

<template>
  <UBadge
    :color="color"
  >
    {{ label }}
  </UBadge>
</template>
