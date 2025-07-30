'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface SiteConfig {
  locales?: string[]
  baseUrl?: string
  metadata?: Record<string, any>
  icons?: {
    favicon?: string
    icon?: string
    apple?: string
    shortcut?: string
  }
  ads?: {
    google?: {
      enabled: boolean
      clientId: string
      slots: {
        [key: string]: {
          adSlot: string
          adFormat: string
          fullWidthResponsive: boolean
          style: string
        }
      }
    }
  }
  meta: {
    title: string
    description: string
    keywords: string
    author: string
    favicon: string
    ogImage: string
  }
  branding: {
    logo: string
    logoImage: string
    tagline: string
  }
  contact: {
    email: string
    phone: string
    address: string
  }
  social: {
    twitter: string
    facebook: string
    linkedin: string
    instagram: string
    github?: string
  }
  analytics: {
    googleAnalytics: string
    googleAdsense: string
    facebookPixel: string
  }
}

export interface ContentConfig {
  sections: Record<string, { enabled: boolean }>
  hero?: {
    ctaLink: string
    secondaryCtaLink: string
    backgroundImage: string
    heroImage: string
  }
  calculator?: any
  sponsors?: {
    logos: Array<{ name: string; image: string }>
  }
  benefits?: {
    items: Array<{ icon: string }>
  }
  features?: {
    items: Array<{ icon: string }>
  }
  testimonials?: {
    items: Array<{ avatar: string }>
  }
  team?: any
  community?: any
  showcase?: any
  pricing?: {
    plans: Array<{
      ctaLink: string
      popular: boolean
    }>
  }
  services?: any
}

interface ConfigContextType {
  siteConfig: SiteConfig | null
  contentConfig: ContentConfig | null
  isLoading: boolean
  updateConfig: (config: Partial<SiteConfig>) => Promise<void>
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const [contentConfig, setContentConfig] = useState<ContentConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadConfigs()
  }, [])

  const loadConfigs = async () => {
    try {
      const [siteResponse, contentResponse] = await Promise.all([
        fetch('/api/config/site'),
        fetch('/api/config/content')
      ])

      if (siteResponse.ok && contentResponse.ok) {
        const [siteData, contentData] = await Promise.all([
          siteResponse.json(),
          contentResponse.json()
        ])
        
        setSiteConfig(siteData)
        setContentConfig(contentData)
      }
    } catch (error) {
      console.error('Failed to load configs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateConfig = async (config: Partial<SiteConfig>) => {
    try {
      const response = await fetch('/api/config/site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (response.ok) {
        const updatedConfig = await response.json()
        setSiteConfig(updatedConfig)
      }
    } catch (error) {
      console.error('Failed to update config:', error)
    }
  }

  return (
    <ConfigContext.Provider value={{
      siteConfig,
      contentConfig,
      isLoading,
      updateConfig
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}