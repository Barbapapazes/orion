<script lang="ts" setup>
const emits = defineEmits<{
  close: []
}>()

function onClick() {
  emits('close')
}
</script>

<template>
  <UCard
    :ui="{ divide: 'divide-none', header: { base: 'flex flex-row items-center justify-between' }, footer: { base: 'flex flex-row items-center justify-between' } }"
  >
    <template #header>
      <h2 class="font-semibold text-lg flex items-center justify-center">
        <UIcon
          :name="INFORMATION_CIRCLE_ICON"
          class="mr-2"
        />
        What is a template?
      </h2>
      <UButton
        color="gray"
        variant="ghost"
        :icon="X_ICON"
        class="-my-1"
        @click="onClick"
      />
    </template>

    <slot />

    <template #footer>
      <UButton
        color="black"
        variant="ghost"
        to="/templates#templates"
      >
        Browse templates
      </UButton>
      <UButton
        color="black"
        to="/templates/new"
      >
        Submit a template
      </UButton>
    </template>
  </UCard>
</template>
