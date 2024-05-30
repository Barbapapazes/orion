<script lang="ts" setup>
const props = defineProps<{
  status: typeof PAID_STATUS[number]
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
</script>

<template>
  <UBadge
    v-if="status === 'free'"
    :color="color"
    variant="subtle"
  >
    Free
  </UBadge>
  <UBadge
    v-else-if="status === 'freemium'"
    color="blue"
    variant="subtle"
  >
    Freemium
  </UBadge>
  <UBadge
    v-else-if="status === 'premium'"
    color="yellow"
    variant="subtle"
  >
    Premium
  </UBadge>
</template>
