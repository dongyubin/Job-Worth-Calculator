import { Users, ArrowRight, ExternalLink } from 'lucide-react'

interface CommunityProps {
  messages: any
  config?: any
}

export function Community({ messages }: CommunityProps) {
  if (!messages?.links) {
    return null
  }

  return (
    <section id="community" className="section-padding section-wave">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            社区联系
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title || 'Join Our Community'}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle || 'Connect with developers worldwide, get the latest product updates and technical support'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {messages.links.map((link: any, index: number) => (
            <div 
              key={index} 
              className="card feature-card animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center p-8">
                {/* Enhanced icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                                rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 
                                transition-transform duration-300">
                    <div className="text-3xl">{link.icon}</div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(var(--primary))] 
                                rounded-full animate-pulse"></div>
                </div>
                
                <h3 className="heading-4 mb-3 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {link.name}
                </h3>
                
                <p className="text-body-sm text-[hsl(var(--muted-foreground))] mb-6">
                  {link.members}
                </p>
                
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-default w-full group"
                >
                  {messages.joinText || 'Join'}
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-up">
          <div className="card-gradient p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-8 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="heading-2 mb-6 text-white drop-shadow-sm">
                {messages.ctaTitle || 'Ready to join us?'}
              </h3>
              
              <p className="text-lg mb-8 text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                {messages.ctaSubtitle || 'Join the community now and start your journey'}
              </p>
              
              <a href="#contact" className="btn btn-glass btn-lg group">
                {messages.ctaButton || 'Join Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}