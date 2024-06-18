<script lang="ts" setup>
const open = defineModel('open', { type: Boolean })
</script>

<template>
  <UModal v-model="open">
    <TemplatesExplanationsModal @close="open = false">
      <TemplatesExplanationsContent />
    </TemplatesExplanationsModal>
  </UModal>
</template>
