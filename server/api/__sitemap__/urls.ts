import { generateShowTemplateURL } from '~/utils'
import type { ImageEntry } from '#sitemap'

export default defineSitemapEventHandler(async () => {
  const templates = await useDrizzle().query.templates.findMany({
    with: {
      category: true,
    },
  })

  const templatesForSitemap = templates.map((template) => {
    const images: ImageEntry[] = [template.featuredImage, template.additionalImages].flat().map(image => ({
      loc: `images/${image}`,
    }))

    return {
      url: generateShowTemplateURL({ categorySlug: template.category.slug, slug: template.slug, hash: template.hash }),
      lastmod: new Date(template.updatedAt),
      images,
    }
  })

  const categories = await useDrizzle().query.categories.findMany()

  const categoriesForSitemap = categories.map(category => ({
    url: `/templates/${category.slug}`,
  }))

  return [
    ...templatesForSitemap,
    ...categoriesForSitemap,
  ]
})
