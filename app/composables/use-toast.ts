export const useErrorToast = (title: string, description?: string) => {
  const toast = useToast()

  toast.add({
    title,
    description,
    icon: X_CIRCLE_ICON,
    color: 'red',
  })
}

export const useSuccessToast = (title: string) => {
  const toast = useToast()

  toast.add({
    title,
    icon: CHECK_CIRCLE_ICON,
    color: 'green',
  })
}
