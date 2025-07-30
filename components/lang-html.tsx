'use client'

import { useEffect } from 'react'

interface LangHtmlProps {
  locale: string
}

export function LangHtml({ locale }: LangHtmlProps) {
  useEffect(() => {
    // Set the lang attribute on the html element
    document.documentElement.lang = locale
  }, [locale])

  return null
}