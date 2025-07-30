import '../globals.css'
import { notFound } from 'next/navigation'
import siteConfig from '@/config/site.json'
import { LanguageProvider } from '@/components/calculator/LanguageContext'
import { LangHtml } from '@/components/lang-html'

// 动态生成metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  // 从配置文件获取支持的语言列表和metadata
  const { locales, baseUrl, metadata } = siteConfig
  
  // 如果语言不在支持列表中，使用英语作为默认值
  const currentLocale = locales.includes(locale) ? locale : 'en'
  const localeMetadata = metadata[currentLocale as keyof typeof metadata]
  
  if (!localeMetadata) {
    // 如果找不到对应语言的metadata，使用英语
    const fallbackMetadata = metadata.en
    return {
      title: fallbackMetadata.title,
      description: fallbackMetadata.description,
      keywords: fallbackMetadata.keywords,
      authors: [{ name: siteConfig.branding.logo }],
      creator: siteConfig.branding.logo,
      metadataBase: new URL(baseUrl),
      openGraph: {
        type: 'website',
        locale: `${locale}_${locale.toUpperCase()}`,
        url: `/${locale}`,
        title: fallbackMetadata.title,
        description: fallbackMetadata.description,
        siteName: siteConfig.branding.logo,
      },
      twitter: {
        card: 'summary_large_image',
        title: fallbackMetadata.title,
        description: fallbackMetadata.description,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  }
  
  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    keywords: localeMetadata.keywords,
    authors: [{ name: siteConfig.branding.logo }],
    creator: siteConfig.branding.logo,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      locale: `${locale}_${locale.toUpperCase()}`,
      url: `/${locale}`,
      title: localeMetadata.title,
      description: localeMetadata.description,
      siteName: siteConfig.branding.logo,
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
  if (!siteConfig.locales.includes(locale)) {
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
  return siteConfig.locales.map((locale) => ({
    locale,
  }))
}