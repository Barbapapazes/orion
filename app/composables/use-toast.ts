export const useErrorToast = (title: string, description?: string) => {
  const toast = useToast()

  toast.add({
    title,
    description,
    icon: 'i-heroicons-exclamation-circle',
    color: 'red',
  })
}

export const useSuccessToast = (title: string) => {
  const toast = useToast()

  toast.add({
    title,
    icon: 'i-heroicons-check-circle',
    color: 'green',
  })
}
