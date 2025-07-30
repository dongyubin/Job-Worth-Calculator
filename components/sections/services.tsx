import { CheckCircle, ArrowRight, Settings, Wrench } from 'lucide-react'

interface ServicesProps {
  messages: any
  config?: any
}

export function Services({ messages }: ServicesProps) {
  if (!messages?.items) {
    return null
  }

  return (
    <section id="services" className="section-padding section-wave">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Settings className="w-4 h-4" />
            专业服务
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title || 'Our Services'}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle || 'Comprehensive services to accelerate your business growth'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {messages.items.map((service: any, index: number) => (
            <div 
              key={index} 
              className="card feature-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                {/* Enhanced header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                                rounded-2xl flex items-center justify-center group-hover:scale-110 
                                transition-transform duration-300">
                    <div className="text-3xl">{service.icon}</div>
                  </div>
                  <div>
                    <h3 className="heading-3 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                                  transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-body-sm text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features list */}
                {service.features && (
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-6 h-6 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center
                                      group-hover:scale-110 transition-transform duration-200">
                          <CheckCircle className="w-4 h-4 text-[hsl(var(--success))] flex-shrink-0" />
                        </div>
                        <span className="text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                                       transition-colors duration-200 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* CTA button */}
                <a href="#contact" className="btn btn-outline btn-default w-full group">
                  {messages.learnMore || 'Learn More'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 animate-fade-up">
          <div className="card-gradient p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-6 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-8 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Wrench className="w-8 h-8 text-white" />
                <h3 className="heading-2 text-white drop-shadow-sm">
                  {messages.ctaTitle || 'Need customized services?'}
                </h3>
              </div>
              
              <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-sm">
                {messages.ctaSubtitle || 'Contact us for exclusive solutions'}
              </p>
              
              <a href="#contact" className="btn btn-glass btn-lg group">
                {messages.ctaButton || 'Contact Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}