'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useConfig } from '@/components/providers/config-provider'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { Calculator } from '@/components/sections/calculator'
import { Sponsors } from '@/components/sections/sponsors'
import { Benefits } from '@/components/sections/benefits'
import { Features } from '@/components/sections/features'
import { Testimonials } from '@/components/sections/testimonials'
import { Team } from '@/components/sections/team'
import { Community } from '@/components/sections/community'
import { Showcase } from '@/components/sections/showcase'
import { Pricing } from '@/components/sections/pricing'
import { FAQ } from '@/components/sections/faq'
import { Services } from '@/components/sections/services'
import { Contact } from '@/components/sections/contact'
import { Acknowledgments } from '@/components/sections/acknowledgments'
import { Footer } from '@/components/sections/footer'
import { BannerAd } from '@/components/ads/google-ads'

interface LandingPageProps {
  locale?: string
}

export function LandingPage({ locale = 'zh' }: LandingPageProps) {
  const { contentConfig, isLoading } = useConfig()
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState(locale)
  const [messages, setMessages] = useState<any>(null)

  // 当locale prop改变时，更新当前语言状态
  useEffect(() => {
    setCurrentLocale(locale)
  }, [locale])

  useEffect(() => {
    loadMessages(currentLocale)
  }, [currentLocale])

  const loadMessages = async (locale: string) => {
    try {
      const response = await fetch(`/api/config/messages?locale=${locale}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleLanguageChange = (newLocale: string) => {
    // 使用路径导航切换语言
    router.push(`/${newLocale}`)
  }

  if (isLoading || !contentConfig || !messages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const sections = contentConfig.sections

  return (
    <div className="min-h-screen bg-white">
      {sections.navbar?.enabled && (
        <Navbar 
          messages={messages} 
          currentLocale={currentLocale}
        />
      )}
      
      {sections.hero?.enabled && (
        <Hero 
          messages={messages.hero}
          config={contentConfig.hero}
        />
      )}
      
      {sections.calculator?.enabled && (
        <Calculator 
          messages={messages}
          locale={currentLocale}
          config={contentConfig.calculator}
        />
      )}

      
      <BannerAd className="max-w-4xl w-full" />
       
      
      {sections.sponsors?.enabled && (
        <Sponsors 
          messages={messages.sponsors}
          config={contentConfig.sponsors}
        />
      )}
      
      {sections.benefits?.enabled && (
        <Benefits 
          messages={messages.benefits}
          config={contentConfig.benefits}
        />
      )}
      
      {sections.features?.enabled && (
        <Features 
          messages={messages.features}
          config={contentConfig.features}
        />
      )}
      
      {sections.testimonials?.enabled && (
        <Testimonials 
          messages={messages.testimonials}
          config={contentConfig.testimonials}
        />
      )}
      
      {sections.team?.enabled && (
        <Team 
          messages={messages.team}
          config={contentConfig.team}
        />
      )}
      
      {sections.community?.enabled && (
        <Community 
          messages={messages.community}
          config={contentConfig.community}
        />
      )}
      
      {sections.showcase?.enabled && (
        <Showcase 
          messages={messages.showcase}
          config={contentConfig.showcase}
        />
      )}
      
      {sections.pricing?.enabled && (
        <Pricing 
          messages={messages.pricing}
          config={contentConfig.pricing}
        />
      )}
      
      {sections.faq?.enabled && (
        <FAQ messages={messages.faq} />
      )}
      
      {sections.services?.enabled && (
        <Services 
          messages={messages.services}
          config={contentConfig.services}
        />
      )}
      
      {sections.contact?.enabled && (
        <Contact messages={messages.contact} />
      )}
      
      {sections.acknowledgments?.enabled && (
        <Acknowledgments messages={messages} />
      )}
      
      {sections.footer?.enabled && (
        <Footer messages={messages.footer} />
      )}

    </div>
  )
}