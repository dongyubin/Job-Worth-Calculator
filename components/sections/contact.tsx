'use client'

import { useState } from 'react'
import { useConfig } from '@/components/providers/config-provider'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'

interface ContactProps {
  messages: any
}

export function Contact({ messages }: ContactProps) {
  const { siteConfig } = useConfig()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加表单提交逻辑
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="section-padding gradient-bg section-wave">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            联系我们
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-left">
            <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                            rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 
                            shadow-lg hover:shadow-[hsl(var(--primary))]/20">
                <Mail className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h3 className="heading-4 mb-2 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {messages.email}
                </h3>
                <p className="text-body-sm text-[hsl(var(--muted-foreground))]">
                  {siteConfig?.contact.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                            rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 
                            shadow-lg hover:shadow-[hsl(var(--primary))]/20">
                <Phone className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h3 className="heading-4 mb-2 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {messages.phone}
                </h3>
                <p className="text-body-sm text-[hsl(var(--muted-foreground))]">
                  {siteConfig?.contact.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:transform hover:translate-x-2 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                            rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 
                            shadow-lg hover:shadow-[hsl(var(--primary))]/20">
                <MapPin className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h3 className="heading-4 mb-2 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {messages.address}
                </h3>
                <p className="text-body-sm text-[hsl(var(--muted-foreground))]">
                  {siteConfig?.contact.address}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-glass p-8 animate-slide-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder={messages.name}
                  required
                  className="w-full px-6 py-4 border border-[hsl(var(--border))]/50 rounded-xl 
                           bg-[hsl(var(--background))]/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] 
                           text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] 
                           transition-all duration-300 hover:border-[hsl(var(--primary))]/30"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder={messages.email_placeholder}
                  required
                  className="w-full px-6 py-4 border border-[hsl(var(--border))]/50 rounded-xl 
                           bg-[hsl(var(--background))]/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] 
                           text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] 
                           transition-all duration-300 hover:border-[hsl(var(--primary))]/30"
                />
              </div>
              
              <div>
                <textarea
                  placeholder={messages.message}
                  rows={5}
                  required
                  className="w-full px-6 py-4 border border-[hsl(var(--border))]/50 rounded-xl 
                           bg-[hsl(var(--background))]/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))] 
                           text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] 
                           transition-all duration-300 hover:border-[hsl(var(--primary))]/30 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full btn btn-gradient btn-lg group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  '发送成功!'
                ) : (
                  <>
                    {messages.send}
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}