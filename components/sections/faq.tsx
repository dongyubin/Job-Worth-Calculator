'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface FAQProps {
  messages: any
}

export function FAQ({ messages }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding section-wave">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            {messages.title}
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title}</span>
          </h2>
          
          <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {messages.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {messages.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="card mb-6 overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left bg-[hsl(var(--background))]/50 backdrop-blur-sm
                         hover:bg-[hsl(var(--accent))]/30 transition-all duration-300 
                         flex justify-between items-center group"
              >
                <h3 className="heading-4 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                               transition-colors duration-300">
                  {item.question}
                </h3>
                <div className={`w-10 h-10 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center
                               group-hover:bg-[hsl(var(--primary))]/20 transition-all duration-300 
                               ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-[hsl(var(--primary))] transition-transform duration-300" />
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6 bg-gradient-to-r from-[hsl(var(--accent))]/20 to-[hsl(var(--secondary))]/10">
                  <div className="w-full h-px bg-gradient-to-r from-[hsl(var(--border))]/50 to-transparent mb-6"></div>
                  <p className="text-body-sm text-[hsl(var(--muted-foreground))] leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}