import Image from 'next/image'
import { ExternalLink, Eye, ArrowRight, Briefcase } from 'lucide-react'

interface ShowcaseProps {
  messages: any
  config?: any
}

export function Showcase({ messages }: ShowcaseProps) {
  if (!messages?.items) {
    return null
  }

  return (
    <section id="showcase" className="section-padding gradient-bg section-divider">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            项目展示
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title || 'Project Showcase'}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle || 'See our excellent work and success stories'}
          </p>
        </div>

        <div className="grid-features">
          {messages.items.map((item: any, index: number) => (
            <div 
              key={index} 
              className="card feature-card group animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Enhanced image container */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl mb-6">
                {item.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay with view icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                  flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full 
                                    flex items-center justify-center transform scale-75 group-hover:scale-100 
                                    transition-transform duration-300">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--primary))]/10 
                                via-[hsl(var(--secondary))]/5 to-[hsl(var(--accent))]/10 
                                flex items-center justify-center relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-transparent animate-pulse"></div>
                      <div className="absolute top-4 left-4 w-2 h-2 bg-[hsl(var(--primary))]/30 rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-1 h-1 bg-[hsl(var(--secondary))]/30 rounded-full"></div>
                    </div>
                    
                    <div className="text-6xl text-[hsl(var(--primary))] group-hover:scale-110 transition-transform duration-300">
                      🚀
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6 pt-0">
                <h3 className="heading-4 mb-4 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-body-sm text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag: string, tagIndex: number) => (
                      <span 
                        key={tagIndex} 
                        className="px-3 py-1 bg-[hsl(var(--accent))]/50 text-[hsl(var(--accent-foreground))] 
                                 text-xs rounded-full border border-[hsl(var(--border))]/50 
                                 hover:bg-[hsl(var(--primary))]/10 hover:border-[hsl(var(--primary))]/30 
                                 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Learn more link */}
                <div className="flex items-center gap-2 text-[hsl(var(--primary))] text-sm font-medium 
                              opacity-0 group-hover:opacity-100 transition-all duration-300 
                              transform translate-y-2 group-hover:translate-y-0">
                  查看详情
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 animate-fade-up">
          <p className="text-body-sm text-[hsl(var(--muted-foreground))] mb-6">
            {messages.moreText || 'Want to see more projects?'}
          </p>
          <a 
            href="#contact" 
            className="btn btn-outline btn-lg group"
          >
            {messages.portfolioLink || 'View Complete Portfolio'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}