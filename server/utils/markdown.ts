import markdownit from 'markdown-it'

const md = markdownit()

export function useMarkdownToHTML(content: string): string {
  return md.render(content)
}
