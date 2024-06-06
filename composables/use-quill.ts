import type { EmitterSource } from 'quill'
import type Quill from 'quill'

export function useQuill(cb: (content: string | undefined, source: EmitterSource) => void) {
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

  onBeforeMount(async () => {
    const Quill = await import('quill').then(m => m.default)
    quill.value = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder,
    })
    quill.value.on('text-change', (_, __, source) => {
      const content = quill.value?.root.innerHTML
      cb(content, source)
    })
  })

  return {
    quill,
  }
}
