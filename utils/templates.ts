export const paidStatusOptions: { value: typeof PAID_STATUS[number], label: string }[] = [{
  value: 'free',
  label: 'Free',
}, {
  value: 'freemium',
  label: 'Freemium',
}, {
  value: 'premium',
  label: 'Premium',
}]

interface GenerateShowTemplateURLElements {
  slug: string
  hash: string
  categorySlug: string
}
export function generateShowTemplateURL(elements: GenerateShowTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}`
}

interface GenerateEditTextTemplateURLElements extends GenerateShowTemplateURLElements {}
export function generateEditTextTemplateURL(elements: GenerateEditTextTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/text`
}

interface GenerateEditImagesTemplateURLElements extends GenerateShowTemplateURLElements {}
export function generateEditImagesTemplateURL(elements: GenerateEditImagesTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/images`
}
