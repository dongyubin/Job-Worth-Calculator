import '../globals.css'
import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/components/calculator/LanguageContext'
import { LangHtml } from '@/components/lang-html'

// 支持的语言列表 - 硬编码以避免在 Edge Runtime 中的导入问题
const supportedLocales = ['zh', 'en', 'ja']

// 动态获取站点配置
async function getSiteConfig() {
  try {
    // 在服务端运行时使用 API 路由获取配置
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://jobworthcalculator.wwkejishe.top'
    
    const response = await fetch(`${baseUrl}/api/config/site`, {
      next: { revalidate: 3600 } // 缓存1小时
    })
    
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch site config:', error)
  }
  
  // 回退配置
  return {
    locales: supportedLocales,
    baseUrl: 'https://jobworthcalculator.wwkejishe.top',
    branding: {
      logo: 'Job Worth Calculator'
    },
    metadata: {
      zh: {
        title: 'Job Worth Calculator - 科学评估你的工作性价比',
        description: '免费的工作价值计算器，科学评估你的工作性价比。',
        keywords: ['工作价值计算器', '薪资计算器', '工作性价比']
      },
      en: {
        title: 'Job Worth Calculator - Scientifically Evaluate Your Job\'s Value',
        description: 'Free job worth calculator to scientifically evaluate your job\'s cost-effectiveness.',
        keywords: ['job worth calculator', 'salary calculator', 'job value']
      },
      ja: {
        title: '仕事価値計算機 - あなたの仕事のコスパを科学的に評価',
        description: '無料の仕事価値計算机で、あなたの仕事のコストパフォーマンスを科学的に評価します。',
        keywords: ['仕事価値計算機', '給与計算機', '仕事コスパ']
      }
    }
  }
}

// 动态生成metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const siteConfig = await getSiteConfig()
  
  // 从配置文件获取支持的语言列表和metadata
  const { locales = supportedLocales, baseUrl, metadata } = siteConfig
  
  // 如果语言不在支持列表中，使用英语作为默认值
  const currentLocale = locales.includes(locale) ? locale : 'en'
  const localeMetadata = metadata?.[currentLocale as keyof typeof metadata] || metadata?.en
  
  if (!localeMetadata) {
    // 如果找不到对应语言的metadata，使用默认值
    return {
      title: 'Job Worth Calculator',
      description: 'Calculate your job worth',
    }
  }
  
  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    keywords: localeMetadata.keywords,
    authors: [{ name: siteConfig.branding?.logo || 'Job Worth Calculator' }],
    creator: siteConfig.branding?.logo || 'Job Worth Calculator',
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      locale: `${locale}_${locale.toUpperCase()}`,
      url: `/${locale}`,
      title: localeMetadata.title,
      description: localeMetadata.description,
      siteName: siteConfig.branding?.logo || 'Job Worth Calculator',
    },
    twitter: {
      card: 'summary_large_image',
      title: localeMetadata.title,
      description: localeMetadata.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // 验证locale是否有效
  const { locale } = await params
  if (!supportedLocales.includes(locale)) {
    notFound()
  }

  return (
    <LanguageProvider locale={locale}>
      <LangHtml locale={locale} />
      {children}
    </LanguageProvider>
  )
}

// 生成静态参数
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({
    locale,
  }))
}