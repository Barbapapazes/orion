<script setup lang="ts">
import type { TemplateStatus } from '~/types'

const props = defineProps<{
  id: number
  status: TemplateStatus
}>()

const { user } = useUserSession()

const isAdmin = user.value?.roleType === 'admin'
const isCreator = user.value?.id === props.id

const color = props.status === 'refused' ? 'red' : 'orange'

const title = props.status === 'refused'
  ? 'This template has been refused. Please check your email for more information and feel free to contact us.'
  : 'This template is not public. You are viewing it because you are ' + (isAdmin ? 'an admin' : isCreator ? 'the creator' : '') + '. ' + (props.status === 'submitted' ? 'We are reviewing it.' : props.status === 'reviewed' ? 'It has been reviewed but some changes are required. Please check your email.' : '')
</script>

<template>
  <UAlert
    :color="color"
    variant="solid"
    icon="i-heroicons-information-circle"
    :title="title"
  />
</template>
