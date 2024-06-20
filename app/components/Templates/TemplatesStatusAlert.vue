<script setup lang="ts">
import type { TemplateStatus } from '~~/types'

const props = defineProps<{
  id: number
  status: TemplateStatus
}>()

const { user } = useUserSession()

const isAdmin = user.value?.roleType === 'admin'
const isCreator = user.value?.id === props.id

const color = props.status === 'refused' ? 'red' : 'orange'

const refusedTitle = 'This template has been refused. Please check your email for more information and feel free to contact us.'

const notPublicTitle = 'This template is not public. You are viewing it because you are ' + (isCreator ? 'the creator' : isAdmin ? 'an admin' : '') + '. ' + (props.status === 'submitted' ? 'We are reviewing it.' : props.status === 'reviewed' ? 'It has been reviewed but some changes are required. Please check your email.' : '')

const title = props.status === 'refused'
  ? refusedTitle
  : notPublicTitle
</script>

<template>
  <UAlert
    :color="color"
    variant="solid"
    :icon="INFORMATION_CIRCLE_ICON"
    :title="title"
  />
</template>
