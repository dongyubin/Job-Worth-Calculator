'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  currentLocale: string
  supportedLocales: string[]
  languageNames: Record<string, string>
  type: 'desktop' | 'mobile'
  onClose?: () => void // For mobile menu
}

export function LanguageSelector({
  currentLocale,
  supportedLocales,
  languageNames,
  type,
  onClose,
}: LanguageSelectorProps) {
  const [currentPathWithQuery, setCurrentPathWithQuery] = useState('/')

  useEffect(() => {
    setCurrentPathWithQuery(`${window.location.pathname}${window.location.search}`)
  }, [currentLocale])

  const getLocaleHref = (locale: string) => {
    const queryIndex = currentPathWithQuery.indexOf('?')
    const currentPath = queryIndex === -1 ? currentPathWithQuery : currentPathWithQuery.slice(0, queryIndex)
    const queryString = queryIndex === -1 ? '' : currentPathWithQuery.slice(queryIndex + 1)
    const segments = currentPath.split('/')
    let localizedPath: string

    if (segments[1] && supportedLocales.includes(segments[1])) {
      segments[1] = locale
      localizedPath = segments.join('/') || `/${locale}`
    } else {
      localizedPath = currentPath === '/' ? `/${locale}` : `/${locale}${currentPath}`
    }

    return queryString ? `${localizedPath}?${queryString}` : localizedPath
  }

  if (type === 'desktop') {
    return (
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] 
                         hover:text-[hsl(var(--foreground))] transition-colors duration-300 rounded-lg 
                         hover:bg-[hsl(var(--accent))]/50">
          <Globe className="w-4 h-4" />
          <span>{languageNames[currentLocale] || currentLocale.toUpperCase()}</span>
        </button>
        
        <div className="absolute top-full right-0 mt-2 py-2 min-w-[120px] bg-[hsl(var(--background))]/95 
                      backdrop-blur-md border border-[hsl(var(--border))]/50 rounded-xl shadow-lg 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                      transition-all duration-300 z-50">
          {supportedLocales.map((locale) => (
            <Link
              key={locale}
              href={getLocaleHref(locale)}
              replace
              className={`block w-full px-4 py-2 text-left text-sm transition-colors duration-200 
                        hover:bg-[hsl(var(--accent))]/50 ${
                currentLocale === locale 
                  ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10' 
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              {languageNames[locale] || locale.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'mobile') {
    return (
      <div className="px-4 py-3 border-t border-[hsl(var(--border))]/50">
        <div className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
          选择语言 / Language
        </div>
        <div className="flex gap-2 flex-wrap">
          {supportedLocales.map((locale) => (
            <Link
              key={locale}
              href={getLocaleHref(locale)}
              replace
              onClick={onClose}
              className={`flex-1 min-w-[80px] px-4 py-2 text-sm rounded-lg transition-all duration-200 text-center ${
                currentLocale === locale
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-[hsl(var(--accent))]/50 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              {languageNames[locale] || locale.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return null
}
