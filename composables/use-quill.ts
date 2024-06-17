import type { EmitterSource } from 'quill'
import type Quill from 'quill'

export function useQuill(content: Ref<string | undefined>, cb: (content: string | undefined, source: EmitterSource) => void) {
  const quill = shallowRef<Quill | null>(null)

  const toolbarOptions = [
    [{ header: 2 }, { header: 3 }],
    ['bold', 'italic', 'underline'],
    [{
      list: 'ordered',
    }, {
      list: 'bullet',
    }], ['blockquote'], ['clean'],
  ]
  const placeholder = 'Tell us more about your template (features, specificities and everything that makes it unique)...'

  function setContent(value: string) {
    if (!quill.value) return

    const selection = quill.value.getSelection()
    if (selection) {
      nextTick(() => quill.value && quill.value.setSelection(selection))
    }
    quill.value.root.innerHTML = value
  }

  // Watch for content changes to reflect them in the editor
  watch(content, (value) => {
    if (quill.value) {
      setContent(value ?? '')
    }
  })

  onBeforeMount(async () => {
    const Quill = await import('quill').then(m => m.default)
    quill.value = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder,
    })
    // Initial value
    setContent(content.value ?? '')

    quill.value.on('text-change', (_, __, source) => {
      const content = quill.value?.root.innerHTML
      cb(content, source)
    })
  })

  return {
    quill,
  }
}
