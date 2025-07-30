'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useConfig } from '@/components/providers/config-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Menu, X, Sparkles, ArrowRight, Globe } from 'lucide-react'
import { LanguageSelector } from '@/components/ui/language-selector'

interface NavbarProps {
  messages: any
  currentLocale?: string
}

export function Navbar({ messages, currentLocale = 'zh' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { siteConfig, contentConfig } = useConfig()

  // 语言显示名称映射
  const languageNames: Record<string, string> = {
    'zh': '中文',
    'en': 'EN',
    'ja': '日本語'
  }

  // 从 siteConfig 获取支持的语言列表，如果不存在则使用默认值
  const supportedLocales = siteConfig?.locales || ['zh', 'en', 'ja']

  const navigation = [
    { name: messages.nav.home, href: '#calculator' },
    ...(contentConfig?.sections?.features?.enabled ? [{ name: messages.nav.features, href: '#features' }] : []),
    ...(contentConfig?.sections?.pricing?.enabled ? [{ name: messages.nav.pricing, href: '#pricing' }] : []),
    ...(contentConfig?.sections?.acknowledgments?.enabled ? [{ name: messages.nav.acknowledgments || '致谢', href: '#acknowledgments' }] : []),
    ...(contentConfig?.sections?.contact?.enabled ? [{ name: messages.nav.contact, href: '#contact' }] : []),
  ]

  return (
    <nav className="fixed top-0 w-full glass-effect border-b border-[hsl(var(--border))]/50 z-50 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-2xl font-bold text-[hsl(var(--foreground))] 
                       hover:text-[hsl(var(--primary))] transition-colors duration-300 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] 
                            rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 
                            transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--primary))] 
                             bg-clip-text text-transparent">
                {siteConfig?.branding.logo || 'Your Brand'}
              </span>
            </Link>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] 
                           px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg
                           hover:bg-[hsl(var(--accent))]/50 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[hsl(var(--primary))] 
                                 transition-all duration-300 group-hover:w-8 group-hover:left-1/2 
                                 group-hover:transform group-hover:-translate-x-1/2"></span>
                </a>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-[hsl(var(--muted-foreground))] 
                               hover:text-[hsl(var(--foreground))] transition-colors duration-300 rounded-lg 
                               hover:bg-[hsl(var(--accent))]/50">
                <Globe className="w-4 h-4" />
                <span className="uppercase">{currentLocale}</span>
              </button>
              
              {/* Language Dropdown */}
              <div className="absolute top-full right-0 mt-2 py-2 min-w-[120px] bg-[hsl(var(--background))]/95 
                            backdrop-blur-md border border-[hsl(var(--border))]/50 rounded-xl shadow-lg 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            transition-all duration-300 z-50">
                {supportedLocales.map((locale) => (
                  <Link
                    key={locale}
                    href={`/${locale}`}
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
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:block">
            <a 
              href="#calculator" 
              className="btn btn-gradient btn-default group relative overflow-hidden"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              立即计算
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                            transition-transform duration-1000"></div>
            </a>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[hsl(var(--accent))]/50 p-2 rounded-xl text-[hsl(var(--foreground))] 
                       hover:bg-[hsl(var(--accent))] transition-all duration-300 
                       focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-2
                       backdrop-blur-sm border border-[hsl(var(--border))]/50"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu with animation */}
      {isOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-[hsl(var(--background))]/95 backdrop-blur-md 
                        border-b border-[hsl(var(--border))]/50 shadow-lg">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] 
                         block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300
                         hover:bg-[hsl(var(--accent))]/50 hover:transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))]/50 rounded-full"></div>
                  {item.name}
                </div>
              </a>
            ))}
            
            {/* Enhanced mobile CTA */}
            <div className="px-4 py-3">
              <a 
                href="#calculator" 
                className="btn btn-gradient btn-default w-full group justify-center"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                立即计算
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Mobile Language Selector */}
            <div className="px-4 py-3 border-t border-[hsl(var(--border))]/50">
              <div className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                选择语言 / Language
              </div>
              <div className="flex gap-2 flex-wrap">
                {supportedLocales.map((locale) => (
                  <Link
                    key={locale}
                    href={`/${locale}`}
                    replace
                    onClick={() => setIsOpen(false)}
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
            
            {/* Mobile Theme Toggle */}
            <div className="px-4 py-3 border-t border-[hsl(var(--border))]/50">
              <div className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                主题设置
              </div>
              <ThemeToggle />
            </div>
            
            {/* Mobile menu decoration */}
            <div className="flex justify-center pt-4">
              <div className="w-12 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] 
                            rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}