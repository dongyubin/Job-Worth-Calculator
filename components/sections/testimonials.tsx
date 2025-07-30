import Image from 'next/image'
import { Quote, Star, Users } from 'lucide-react'

interface TestimonialsProps {
  messages: any
  config: any
}

export function Testimonials({ messages, config }: TestimonialsProps) {
  return (
    <section id="testimonials" className="section-padding section-divider">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            客户见证
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle}
          </p>
        </div>

        <div className="grid-testimonials">
          {messages.items?.map((item: any, index: number) => (
            <div 
              key={index} 
              className="card feature-card animate-scale-in relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon with enhanced styling */}
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                              rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-[hsl(var(--primary))]/60" />
                </div>
              </div>
              
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className="w-5 h-5 text-[hsl(var(--warning))] fill-current" 
                  />
                ))}
              </div>
              
              {/* Testimonial content */}
              <div className="mb-8">
                <p className="text-body-sm text-[hsl(var(--foreground))] leading-relaxed italic">
                  “{item.content}”
                </p>
              </div>

              {/* Customer info */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 relative">
                  {config.testimonials?.items[index]?.avatar ? (
                    <div className="relative">
                      <Image
                        src={config.testimonials.items[index].avatar}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded-full ring-2 ring-[hsl(var(--border))]/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[hsl(var(--success))] 
                                    rounded-full border-2 border-[hsl(var(--background))]"></div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                                  rounded-full flex items-center justify-center ring-2 ring-[hsl(var(--border))]/50">
                      <span className="text-[hsl(var(--primary))] font-semibold text-lg">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <div className="heading-4 text-[hsl(var(--foreground))] mb-1">
                    {item.name}
                  </div>
                  <div className="text-caption text-[hsl(var(--muted-foreground))]">
                    {item.position}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}