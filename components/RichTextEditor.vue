<script lang="ts" setup>
import 'quill/dist/quill.snow.css'
import '~/assets/css/quill.css'
import type { EmitterSource } from 'quill'

const props = defineProps<{
  modelValue: string | undefined
}>()

const emits = defineEmits<{
  'update:modelValue': [string, EmitterSource]
}>()

useQuill(toRef(() => props.modelValue), (content, source) => {
  emits('update:modelValue', content ?? '', source)
})
</script>

<template>
  <div id="editor" />
</template>
