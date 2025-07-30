import { Check, Star, ArrowRight, Crown, Sparkles } from 'lucide-react'

interface PricingProps {
  messages: any
  config: any
}

export function Pricing({ messages, config }: PricingProps) {
  return (
    <section id="pricing" className="section-padding section-wave">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            选择适合您的方案
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid-pricing">
          {messages.plans?.map((plan: any, index: number) => {
            const isPopular = config.pricing?.plans[index]?.popular
            return (
              <div
                key={index}
                className={`pricing-card animate-scale-in ${isPopular ? 'pricing-card-popular' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] 
                                  text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 
                                  shadow-lg animate-pulse">
                      <Star className="w-4 h-4 fill-current" />
                      {messages.popular}
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="heading-3 mb-3 text-[hsl(var(--foreground))]">
                    {plan.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className={`text-5xl font-bold ${isPopular ? 'text-gradient' : 'text-[hsl(var(--foreground))]'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-[hsl(var(--muted-foreground))] ml-2 text-lg">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-body-sm text-[hsl(var(--muted-foreground))]">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features?.map((feature: string, featureIndex: number) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-6 h-6 bg-[hsl(var(--success))]/10 rounded-full flex items-center justify-center
                                    group-hover:scale-110 transition-transform duration-200">
                        <Check className="w-4 h-4 text-[hsl(var(--success))] flex-shrink-0" />
                      </div>
                      <span className="text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                                     transition-colors duration-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={config.pricing?.plans[index]?.ctaLink || '#contact'}
                  className={`w-full ${
                    isPopular
                      ? 'btn btn-gradient btn-lg'
                      : 'btn btn-outline btn-lg'
                  } group justify-center`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                
                {/* Additional info for popular plan */}
                {isPopular && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      🎉 限时优惠，立省30%
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Bottom guarantee */}
        <div className="text-center mt-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[hsl(var(--success))]/10 
                        border border-[hsl(var(--success))]/20 text-[hsl(var(--success))] font-medium">
            <Check className="w-5 h-5" />
            30天无条件退款保证
          </div>
          <p className="text-[hsl(var(--muted-foreground))] mt-4 max-w-2xl mx-auto">
            我们对产品质量充满信心，如果您在30天内不满意，我们将全额退款，无需任何理由。
          </p>
        </div>
      </div>
    </section>
  )
}