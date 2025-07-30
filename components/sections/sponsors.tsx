import Image from 'next/image'
import { Building2 } from 'lucide-react'

interface SponsorsProps {
  messages: any
  config: any
}

export function Sponsors({ messages, config }: SponsorsProps) {
  return (
    <section className="section-padding-sm gradient-bg">
      <div className="container-custom">
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-8">
            <Building2 className="w-4 h-4" />
            {messages.title}
          </div>
          
          {/* Infinite scroll container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-x space-x-12 items-center">
              {/* First set of logos */}
              {config.logos?.map((logo: any, index: number) => (
                <div 
                  key={`first-${index}`}
                  className="flex-shrink-0 group cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  {logo.image ? (
                    <div className="relative">
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain opacity-60 group-hover:opacity-100 
                                 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                      />
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/10 
                                    to-[hsl(var(--secondary))]/10 rounded-lg opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 blur-xl"></div>
                    </div>
                  ) : (
                    <div className="h-12 w-24 bg-[hsl(var(--accent))]/50 backdrop-blur-sm rounded-xl 
                                  flex items-center justify-center border border-[hsl(var(--border))]/50 
                                  group-hover:bg-[hsl(var(--primary))]/10 group-hover:border-[hsl(var(--primary))]/30 
                                  transition-all duration-300">
                      <span className="text-xs text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] 
                                     font-medium transition-colors duration-300">
                        {logo.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {config.logos?.map((logo: any, index: number) => (
                <div 
                  key={`second-${index}`}
                  className="flex-shrink-0 group cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  {logo.image ? (
                    <div className="relative">
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain opacity-60 group-hover:opacity-100 
                                 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                      />
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/10 
                                    to-[hsl(var(--secondary))]/10 rounded-lg opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 blur-xl"></div>
                    </div>
                  ) : (
                    <div className="h-12 w-24 bg-[hsl(var(--accent))]/50 backdrop-blur-sm rounded-xl 
                                  flex items-center justify-center border border-[hsl(var(--border))]/50 
                                  group-hover:bg-[hsl(var(--primary))]/10 group-hover:border-[hsl(var(--primary))]/30 
                                  transition-all duration-300">
                      <span className="text-xs text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] 
                                     font-medium transition-colors duration-300">
                        {logo.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}