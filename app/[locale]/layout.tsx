import '../globals.css'
import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/components/calculator/LanguageContext'
import { LangHtml } from '@/components/lang-html'
import siteConfigData from '@/config/site.json'

// 支持的语言列表 - 硬编码以避免在 Edge Runtime 中的导入问题
const supportedLocales = ['zh', 'en', 'ja']

// Metadata runs during build, so read config locally instead of fetching our own API.
function getSiteConfig() {
  return siteConfigData
}

// 动态生成metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const siteConfig = getSiteConfig()
  
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
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-CN': `${baseUrl}/zh`,
        'en-US': `${baseUrl}/en`,
        'ja-JP': `${baseUrl}/ja`,
      },
    },
    icons: siteConfig.icons || {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      locale: `${locale}_${locale.toUpperCase()}`,
      url: `${baseUrl}/${locale}`,
      title: localeMetadata.title,
      description: localeMetadata.description,
      siteName: siteConfig.branding?.logo || 'Job Worth Calculator',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: localeMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localeMetadata.title,
      description: localeMetadata.description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
