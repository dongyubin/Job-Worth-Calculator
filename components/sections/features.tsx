import { 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Settings, 
  Target,
  ArrowRight,
  CheckCircle 
} from 'lucide-react'

interface FeaturesProps {
  messages: any
  config: any
}

export function Features({ messages, config }: FeaturesProps) {
  const iconComponents = [Zap, Shield, Globe, Smartphone, Settings, Target]

  return (
    <section id="features" className="section-padding section-overlap">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            {messages.title}
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid-features">
          {messages.items?.map((item: any, index: number) => {
            const IconComponent = iconComponents[index] || Target
            
            return (
              <div 
                key={index} 
                className="feature-card group animate-scale-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon container with enhanced design */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                                rounded-2xl flex items-center justify-center group-hover:scale-110 
                                transition-all duration-500 relative overflow-hidden">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--secondary))]/20 
                                  rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <IconComponent className="w-8 h-8 text-[hsl(var(--primary))] relative z-10 
                                             group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  {/* Floating dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(var(--primary))] 
                                rounded-full animate-pulse"></div>
                </div>
                
                {/* Content */}
                <h3 className="heading-4 mb-4 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-body-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
                  {item.description}
                </p>
                
              </div>
            )
          })}
        </div>
        
      </div>
    </section>
  )
}