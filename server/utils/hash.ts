import { nanoid } from 'nanoid'

export function useHash() {
  return nanoid(12)
}
