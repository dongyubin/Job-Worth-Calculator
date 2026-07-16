import Link from 'next/link'
import { ArrowRight, Calculator, Clock } from 'lucide-react'
import { Navbar } from '@/components/sections/navbar'
import { getBlogPosts, normalizeBlogLocale } from '@/lib/blog'
import enMessages from '@/messages/en.json'
import zhMessages from '@/messages/zh.json'
import jaMessages from '@/messages/ja.json'

const messagesByLocale = {
  zh: zhMessages,
  en: enMessages,
  ja: jaMessages,
} as const

const blogPageCopy = {
  zh: {
    title: '工作价值博客',
    description: '用更清晰的数据和判断框架，理解薪资、工时、通勤和工作环境的真实价值。',
    metaTitle: '工作价值博客 | Job Worth Calculator',
    metaDescription: '关于工作价值、真实时薪、通勤成本和职业判断的实用文章。',
    cta: '打开工作价值计算器',
    readMore: '阅读全文',
  },
  en: {
    title: 'Job Worth Blog',
    description: 'Practical guides for evaluating salary, hours, commute, workplace conditions, and whether a job is worth the grind.',
    metaTitle: 'Job Worth Blog | Job Worth Calculator',
    metaDescription: 'Practical articles about job value, real hourly pay, commute costs, and career tradeoffs.',
    cta: 'Open the Job Worth Calculator',
    readMore: 'Read article',
  },
  ja: {
    title: '仕事価値ブログ',
    description: '給与、労働時間、通勤、職場環境をもとに、仕事の本当の価値を考えるためのガイドです。',
    metaTitle: '仕事価値ブログ | Job Worth Calculator',
    metaDescription: '仕事価値、実質時給、通勤コスト、キャリア判断に関する実用記事。',
    cta: '仕事価値計算機を開く',
    readMore: '記事を読む',
  },
} as const

interface BlogPageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params
  const currentLocale = normalizeBlogLocale(locale)
  const copy = blogPageCopy[currentLocale]

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const currentLocale = normalizeBlogLocale(locale)
  const messages = messagesByLocale[currentLocale]
  const posts = await getBlogPosts(currentLocale)
  const copy = blogPageCopy[currentLocale]
  const calculatorHref = `/${currentLocale}#calculator`

  return (
    <div className="app-page min-h-screen">
      <Navbar messages={messages} currentLocale={currentLocale} linkMode="home" />
      <main className="pt-28 pb-16">
        <section className="container-custom">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-3 py-1 text-sm font-medium text-[hsl(var(--foreground))]">
              Blog
            </div>
            <h1 className="text-4xl font-bold text-[hsl(var(--foreground))] sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              {copy.description}
            </p>
            <Link href={calculatorHref} className="btn btn-gradient btn-default group mt-7">
              <Calculator className="h-4 w-4" />
              {copy.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {posts.map(post => (
              <article
                key={post.slug}
                className="flex min-h-full flex-col rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 transition-colors hover:border-[hsl(var(--primary))]/50"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <span className="rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 font-medium text-[hsl(var(--foreground))]">
                    {post.frontmatter.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.frontmatter.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold leading-7 text-[hsl(var(--foreground))]">
                  {post.frontmatter.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
                  {post.frontmatter.excerpt}
                </p>
                <Link
                  href={`/${currentLocale}/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))]"
                >
                  {copy.readMore}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
