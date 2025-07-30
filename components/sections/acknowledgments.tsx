'use client'

import { useConfig } from '@/components/providers/config-provider'
import { ExternalLink, Heart } from 'lucide-react'

interface AcknowledgmentsProps {
  messages: any
}

interface AcknowledgmentItem {
  name: string
  author: string
  description: string
  url: string
  license: string
}

interface AcknowledgmentCategory {
  name: string
  icon: string
  items: AcknowledgmentItem[]
}

export function Acknowledgments({ messages }: AcknowledgmentsProps) {
  const { contentConfig } = useConfig()

  if (!contentConfig?.sections?.acknowledgments?.enabled) {
    return null
  }

  // 从 messages 中获取感谢数据
  const acknowledgmentsData = messages.acknowledgments
  if (!acknowledgmentsData) {
    return null
  }

  const categories: AcknowledgmentCategory[] = acknowledgmentsData?.categories || []

  return (
    <section id="acknowledgments" className="section-padding bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--accent))]/10">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            {acknowledgmentsData.title || '致谢'}
          </div>
          
          <h2 className="heading-1 mb-6 bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
            {acknowledgmentsData.title || '致谢'}
          </h2>
          
          <p className="text-body-lg text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            {acknowledgmentsData.subtitle || '感谢以下开源项目和贡献者，让这个项目成为可能'}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="group">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] 
                              rounded-xl flex items-center justify-center text-2xl shadow-lg">
                  {category.icon}
                </div>
                <h3 className="heading-2 text-[hsl(var(--foreground))]">
                  {category.name}
                </h3>
              </div>

              {/* Category Items */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group/card bg-[hsl(var(--background))]/80 backdrop-blur-sm border border-[hsl(var(--border))]/50 
                             rounded-xl p-6 hover:border-[hsl(var(--primary))]/50 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/10
                             transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-[hsl(var(--foreground))] text-lg mb-1 
                                     group-hover/card:text-[hsl(var(--primary))] transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[hsl(var(--muted-foreground))] text-sm">
                          {acknowledgmentsData.by || '由'} {item.author}
                        </p>
                      </div>
                      
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--primary))] 
                                 rounded-lg flex items-center justify-center transition-all duration-300 
                                 hover:scale-110 group/link opacity-0 group-hover/card:opacity-100"
                        aria-label={`Visit ${item.name}`}
                      >
                        <ExternalLink className="w-4 h-4 text-[hsl(var(--foreground))] 
                                               group-hover/link:text-white transition-colors" />
                      </a>
                    </div>

                    {/* Project Description */}
                    <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* License */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md 
                                     bg-[hsl(var(--accent))]/30 text-xs font-medium text-[hsl(var(--foreground))]">
                        {item.license} {messages.license || '许可证'}
                      </span>
                      
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]/80 
                                 text-sm font-medium transition-colors duration-300 flex items-center gap-1
                                 opacity-0 group-hover/card:opacity-100"
                      >
                        {acknowledgmentsData.visit_project || '访问项目'}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full 
                        bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                        border border-[hsl(var(--border))]/50">
            <Heart className="w-5 h-5 text-[hsl(var(--primary))] animate-pulse" />
            <span className="text-[hsl(var(--muted-foreground))] text-sm">
              {acknowledgmentsData.open_source_love || '感谢开源社区的无私奉献 💝'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}