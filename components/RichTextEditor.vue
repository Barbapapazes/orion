<script lang="ts" setup>
import 'quill/dist/quill.snow.css'
import '~/assets/css/quill.css'
import type { EmitterSource } from 'quill'

const emits = defineEmits<{
  change: [string, EmitterSource]
}>()

const { quill } = useQuill((content, source) => {
  emits('change', content ?? '', source)
})

function reset() {
  quill.value?.setText('')
}

defineExpose({ reset })
</script>

<template>
  <div id="editor" />
</template>
