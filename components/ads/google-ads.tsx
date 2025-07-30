'use client'

import { useEffect } from 'react'
import { useConfig } from '@/components/providers/config-provider'
import Script from 'next/script'

interface GoogleAdsProps {
  slotName?: string
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function GoogleAds({ slotName = 'banner', className = '' }: GoogleAdsProps) {
  const { siteConfig } = useConfig()
  
  // 检查是否启用了Google Ads
  if (!siteConfig?.ads?.google?.enabled) {
    return null
  }
  
  const googleAds = siteConfig.ads.google
  const adSlot = googleAds.slots[slotName]
  
  if (!adSlot) {
    console.warn(`Google Ads slot "${slotName}" not found in configuration`)
    return null
  }
  
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('Google Ads error:', error)
    }
  }, [])
  
  return (
    <div className={`google-ads-container ${className}`}>
      {/* Google AdSense Script */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAds.clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{
          display: adSlot.style === 'display:block' ? 'block' : adSlot.style,
        }}
        data-ad-client={googleAds.clientId}
        data-ad-slot={adSlot.adSlot}
        data-ad-format={adSlot.adFormat}
        data-full-width-responsive={adSlot.fullWidthResponsive.toString()}
      />
    </div>
  )
}

// 预配置的广告位组件
export function BannerAd({ className }: { className?: string }) {
  return <GoogleAds slotName="banner" className={className} />
}

// 用于在页面中多个位置显示广告的Hook
export function useGoogleAds() {
  const { siteConfig } = useConfig()
  
  return {
    isEnabled: siteConfig?.ads?.google?.enabled || false,
    clientId: siteConfig?.ads?.google?.clientId,
    slots: siteConfig?.ads?.google?.slots || {},
  }
}