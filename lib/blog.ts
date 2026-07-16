import type { ComponentType } from 'react'

export const supportedBlogLocales = ['zh', 'en', 'ja'] as const
export const blogSlugs = [
  'is-your-job-worth-the-grind',
  'how-to-calculate-real-hourly-pay',
  'commute-overtime-hidden-job-costs',
] as const

export type BlogLocale = (typeof supportedBlogLocales)[number]
export type BlogSlug = (typeof blogSlugs)[number]

export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  excerpt: string
}

interface BlogModule {
  default: ComponentType
  frontmatter: BlogFrontmatter
}

export interface BlogPost {
  locale: BlogLocale
  slug: BlogSlug
  frontmatter: BlogFrontmatter
  Content: ComponentType
}

const postLoaders: Record<BlogLocale, Record<BlogSlug, () => Promise<BlogModule>>> = {
  zh: {
    'is-your-job-worth-the-grind': () => import('@/content/blog/zh/is-your-job-worth-the-grind.mdx'),
    'how-to-calculate-real-hourly-pay': () => import('@/content/blog/zh/how-to-calculate-real-hourly-pay.mdx'),
    'commute-overtime-hidden-job-costs': () => import('@/content/blog/zh/commute-overtime-hidden-job-costs.mdx'),
  },
  en: {
    'is-your-job-worth-the-grind': () => import('@/content/blog/en/is-your-job-worth-the-grind.mdx'),
    'how-to-calculate-real-hourly-pay': () => import('@/content/blog/en/how-to-calculate-real-hourly-pay.mdx'),
    'commute-overtime-hidden-job-costs': () => import('@/content/blog/en/commute-overtime-hidden-job-costs.mdx'),
  },
  ja: {
    'is-your-job-worth-the-grind': () => import('@/content/blog/ja/is-your-job-worth-the-grind.mdx'),
    'how-to-calculate-real-hourly-pay': () => import('@/content/blog/ja/how-to-calculate-real-hourly-pay.mdx'),
    'commute-overtime-hidden-job-costs': () => import('@/content/blog/ja/commute-overtime-hidden-job-costs.mdx'),
  },
}

export function normalizeBlogLocale(locale: string): BlogLocale {
  return locale === 'en' || locale === 'ja' ? locale : 'zh'
}

export async function getBlogPost(locale: string, slug: string): Promise<BlogPost | null> {
  const currentLocale = normalizeBlogLocale(locale)
  if (!blogSlugs.includes(slug as BlogSlug)) return null

  const currentSlug = slug as BlogSlug
  const mod = await postLoaders[currentLocale][currentSlug]()

  return {
    locale: currentLocale,
    slug: currentSlug,
    frontmatter: mod.frontmatter,
    Content: mod.default,
  }
}

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const currentLocale = normalizeBlogLocale(locale)
  const posts = await Promise.all(blogSlugs.map(slug => getBlogPost(currentLocale, slug)))

  return posts
    .filter((post): post is BlogPost => Boolean(post))
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getAllBlogStaticParams() {
  return supportedBlogLocales.flatMap(locale => blogSlugs.map(slug => ({ locale, slug })))
}
