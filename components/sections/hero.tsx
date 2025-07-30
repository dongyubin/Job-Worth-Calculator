import Image from 'next/image'
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react'
import { useConfig } from '@/components/providers/config-provider'

interface HeroProps {
  messages: any
  config: any
}

export function Hero({ messages, config }: HeroProps) {
  const { contentConfig } = useConfig()
  
  // Determine CTA link based on pricing section availability
  const ctaLink = contentConfig?.sections?.pricing?.enabled 
    ? (config.ctaLink || '#pricing')
    : '#contact'
    
  return (
    <section id="hero" className="gradient-mesh section-padding-lg pt-36 section-divider relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[hsl(var(--primary))]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[hsl(var(--secondary))]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[hsl(var(--secondary))] rounded-full animate-pulse"></div>
      </div>
      
      <div className="container-custom">
        <div className="grid-hero">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                          border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              新产品发布
            </div>
            
            <h1 className="heading-1 mb-6 animate-slide-left">
              <span className="text-gradient">{messages.title}</span>
            </h1>
            
            <p className="text-body mb-6 animate-slide-left" style={{animationDelay: '0.2s'}}>
              {messages.subtitle}
            </p>
            
            <p className="text-body-sm mb-8 text-[hsl(var(--muted-foreground))] animate-slide-left" 
               style={{animationDelay: '0.4s'}}>
              {messages.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
                 style={{animationDelay: '0.6s'}}>
              <a 
                href={ctaLink} 
                className="btn btn-gradient btn-lg group"
              >
                <Zap className="w-5 h-5" />
                {messages.ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <a 
                href={config.secondaryCtaLink || '#showcase'} 
                className="btn btn-glass btn-lg group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {messages.secondaryCtaText}
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 animate-fade-up"
                 style={{animationDelay: '0.8s'}}>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[hsl(var(--foreground))]">10K+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">活跃用户</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[hsl(var(--foreground))]">99.9%</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">正常运行时间</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[hsl(var(--foreground))]">24/7</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">技术支持</div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="lg:order-2 animate-slide-right">
            <div className="relative group">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gradient-from))]/20 
                            via-[hsl(var(--gradient-via))]/20 to-[hsl(var(--gradient-to))]/20 
                            rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 
                            animate-pulse"></div>
              
              {/* Main container */}
              <div className="relative bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--muted))]/30 
                            rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-[hsl(var(--border))]/50
                            group-hover:shadow-[0_25px_50px_-12px] group-hover:shadow-[hsl(var(--primary))]/25
                            transition-all duration-500 group-hover:-translate-y-2">
                {config.heroImage ? (
                  <Image
                    src={config.heroImage}
                    alt="Product Demo"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-[hsl(var(--primary))]/10 
                                via-[hsl(var(--secondary))]/5 to-[hsl(var(--accent))]/10 
                                rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-transparent animate-pulse"></div>
                      <div className="absolute top-4 left-4 w-2 h-2 bg-[hsl(var(--primary))]/30 rounded-full"></div>
                      <div className="absolute top-12 right-8 w-1 h-1 bg-[hsl(var(--secondary))]/30 rounded-full"></div>
                      <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-[hsl(var(--primary))]/30 rounded-full"></div>
                    </div>
                    
                    <div className="text-center relative z-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] 
                                    rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg 
                                    group-hover:scale-110 transition-transform duration-500">
                        <Play className="w-10 h-10 text-white group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <p className="text-[hsl(var(--muted-foreground))] font-medium">产品演示视频</p>
                      <p className="text-[hsl(var(--muted-foreground))]/70 text-sm mt-2">点击观看完整演示</p>
                    </div>
                  </div>
                )}
                
                {/* Floating elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-[hsl(var(--primary))] rounded-full 
                              animate-bounce shadow-lg"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-[hsl(var(--secondary))] rounded-full 
                              animate-pulse shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}