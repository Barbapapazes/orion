interface GenerateShowTemplateURLElements {
  slug: string
  hash: string
  categorySlug: string
}
/**
 * Generate the URL for the show page of a template
 */
export function generateShowTemplateURL(elements: GenerateShowTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}`
}

interface GenerateEditTextTemplateURLElements extends GenerateShowTemplateURLElements {}
/**
 * Generate the URL for the edit text page of a template
 */
export function generateEditTextTemplateURL(elements: GenerateEditTextTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/text`
}

interface GenerateEditImagesTemplateURLElements extends GenerateShowTemplateURLElements {}
/**
 * Generate the URL for the edit images page of a template
 */
export function generateEditImagesTemplateURL(elements: GenerateEditImagesTemplateURLElements) {
  return `/templates/${elements.categorySlug}/${elements.slug}-${elements.hash}/edit/images`
}
