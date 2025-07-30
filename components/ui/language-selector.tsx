'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'

interface LanguageSelectorProps {
  currentLocale: string
  onLocaleChange: (locale: string) => void
}

export function LanguageSelector({ currentLocale, onLocaleChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLocale)

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-white transition-colors shadow-sm"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[120px] overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  onLocaleChange(language.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                  currentLocale === language.code ? 'bg-primary-50 text-primary-600' : ''
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}