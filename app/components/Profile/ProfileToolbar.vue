<script lang="ts" setup>
import type { TemplateStatus } from '~/types'

defineProps<{
  badge: string | number
}>()

const status = defineModel<TemplateStatus | undefined>('status')
const paidStatus = defineModel<TemplateStatus | undefined>('paid-status')

const statusOptions = [
  { label: 'All', value: undefined },
  ...templateStatusOptions,
]

const paidStatusOptions = [
  { label: 'All', value: undefined },
  ...templatePaidStatusOptions,
]
</script>

<template>
  <div class="flex flex-col md:flex-row md:justify-between gap-4">
    <div class="flex items-center gap-2">
      <h2 class="text-lg font-semibold">
        Templates
      </h2>
      <UBadge
        :label="badge"
        color="primary"
        variant="subtle"
      />
    </div>

    <div class="flex gap-4">
      <USelectMenu
        v-model="paidStatus"
        :options="paidStatusOptions"
        placeholder="Paid status"
        value-attribute="value"
        option-attribute="label"
      />

      <USelectMenu
        v-model="status"
        :options="statusOptions"
        placeholder="Status"
        value-attribute="value"
        option-attribute="label"
      />
    </div>
  </div>
</template>
