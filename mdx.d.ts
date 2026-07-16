declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export const frontmatter: {
    title: string
    description: string
    date: string
    readTime: string
    category: string
    excerpt: string
  }

  const MDXContent: ComponentType
  export default MDXContent
}
