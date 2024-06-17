export function useCopy(text: string) {
  const toast = useToast()

  navigator.clipboard.writeText(text)
    .then(() => {
      toast.add({
        title: 'Copied to clipboard',
        color: 'green',
      })
    })
    .catch(() => {
      toast.add({
        title: 'Failed to copy to clipboard',
        color: 'red',
      })
    })
}
