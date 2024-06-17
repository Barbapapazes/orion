import { FetchError } from 'ofetch'

export function handleFetchError(error: unknown) {
  if (error instanceof FetchError) {
    useErrorToast(error.data.message ?? 'Something went wrong')
  }
  else {
    useErrorToast('Something went wrong', error instanceof Error ? error.message : undefined)
  }
}
