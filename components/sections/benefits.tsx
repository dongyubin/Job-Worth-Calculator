import { Rocket, DollarSign, TrendingUp, Gift } from 'lucide-react'

interface BenefitsProps {
  messages: any
  config: any
}

export function Benefits({ messages, config }: BenefitsProps) {
  const iconComponents = [Rocket, DollarSign, TrendingUp, Gift]

  return (
    <section id="benefits" className="section-padding section-overlap">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            专业优势
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle}
          </p>
        </div>

        <div className="grid-features">
          {messages.items?.map((item: any, index: number) => {
            const IconComponent = iconComponents[index] || Gift
            
            return (
              <div 
                key={index} 
                className="feature-card group animate-scale-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Enhanced icon container */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                                rounded-3xl flex items-center justify-center group-hover:scale-110 
                                transition-all duration-500 relative overflow-hidden mx-auto">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--secondary))]/20 
                                  rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <IconComponent className="w-10 h-10 text-[hsl(var(--primary))] relative z-10 
                                             group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  {/* Floating dot */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[hsl(var(--primary))] 
                                rounded-full animate-pulse"></div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="heading-3 mb-4 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                                transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-body-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}