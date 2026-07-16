import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calculator, Clock } from 'lucide-react'
import { Navbar } from '@/components/sections/navbar'
import { getAllBlogStaticParams, getBlogPost, normalizeBlogLocale } from '@/lib/blog'
import enMessages from '@/messages/en.json'
import zhMessages from '@/messages/zh.json'
import jaMessages from '@/messages/ja.json'

const messagesByLocale = {
  zh: zhMessages,
  en: enMessages,
  ja: jaMessages,
} as const

const articleCopy = {
  zh: {
    back: '返回博客',
    cta: '打开工作价值计算器',
  },
  en: {
    back: 'Back to blog',
    cta: 'Open the Job Worth Calculator',
  },
  ja: {
    back: 'ブログに戻る',
    cta: '仕事価値計算機を開く',
  },
} as const

interface BlogArticlePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllBlogStaticParams()
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params
  const post = await getBlogPost(locale, slug)

  if (!post) {
    return {
      title: 'Blog | Job Worth Calculator',
    }
  }

  return {
    title: `${post.frontmatter.title} | Job Worth Calculator`,
    description: post.frontmatter.description,
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { locale, slug } = await params
  const currentLocale = normalizeBlogLocale(locale)
  const post = await getBlogPost(currentLocale, slug)

  if (!post) notFound()

  const messages = messagesByLocale[currentLocale]
  const copy = articleCopy[currentLocale]
  const calculatorHref = `/${currentLocale}#calculator`
  const Content = post.Content

  return (
    <div className="app-page min-h-screen">
      <Navbar messages={messages} currentLocale={currentLocale} linkMode="home" />
      <main className="pt-28 pb-16">
        <article className="container-custom max-w-4xl">
          <Link
            href={`/${currentLocale}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </Link>

          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
              <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-3 py-1 font-medium text-[hsl(var(--foreground))]">
                {post.frontmatter.category}
              </span>
              <span>{post.frontmatter.date}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.frontmatter.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[hsl(var(--foreground))] sm:text-5xl">
              {post.frontmatter.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              {post.frontmatter.description}
            </p>
          </header>

          <div className="blog-mdx">
            <Content />
          </div>

          <footer className="mt-12 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-6">
            <Link href={calculatorHref} className="btn btn-gradient btn-default group">
              <Calculator className="h-4 w-4" />
              {copy.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </footer>
        </article>
      </main>
    </div>
  )
}
