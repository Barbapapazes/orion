<script lang="ts" setup generic="T">
import type { BouncerAbility } from '../../src/types'
import { allows } from '../utils/bouncer'
import { computed } from '#imports'

const props = defineProps<{
  bouncerAbility: BouncerAbility<T>
  data: T
}>()

const can = computed(() => {
  return allows(props.bouncerAbility, props.data)
})
</script>

<template>
  <template
    v-if="can"
  >
    <slot />
  </template>
</template>
