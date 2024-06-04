import type Quill from 'quill'

export function useQuill() {
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
  })

  return quill
}
