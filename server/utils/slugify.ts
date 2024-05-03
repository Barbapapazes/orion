import slugify from 'slugify'

export function useSlugify(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
  })
}
