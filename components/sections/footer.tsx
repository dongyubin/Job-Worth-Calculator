import Link from 'next/link'
import { useConfig } from '@/components/providers/config-provider'
import { Twitter, Facebook, Linkedin, Instagram, Github, Heart } from 'lucide-react'

interface FooterProps {
  messages: any
}

export function Footer({ messages }: FooterProps) {
  const { siteConfig, contentConfig } = useConfig()

  // 只有当对应的sections在contentConfig中启用时才显示链接
  const footerLinks = {
    product: [
      ...(contentConfig?.sections?.features?.enabled ? [{ name: messages.features, href: '#features' }] : []),
      ...(contentConfig?.sections?.pricing?.enabled ? [{ name: messages.pricing, href: '#pricing' }] : []),
    ],
    support: [
      ...(contentConfig?.sections?.faq?.enabled ? [{ name: messages.faq, href: '#faq' }] : []),
      ...(contentConfig?.sections?.acknowledgments?.enabled ? [{ name: messages.nav?.acknowledgments || '致谢', href: '#acknowledgments' }] : []),
      ...(contentConfig?.sections?.contact?.enabled ? [{ name: messages.contact, href: '#contact' }] : []),
    ],
  }

  // 社交媒体链接从简化后的siteConfig获取（如果有的话）
  const socialLinks = [
    ...(siteConfig?.social?.twitter ? [{ name: 'Twitter', href: siteConfig.social.twitter, icon: Twitter }] : []),
    ...(siteConfig?.social?.facebook ? [{ name: 'Facebook', href: siteConfig.social.facebook, icon: Facebook }] : []),
    ...(siteConfig?.social?.linkedin ? [{ name: 'LinkedIn', href: siteConfig.social.linkedin, icon: Linkedin }] : []),
    ...(siteConfig?.social?.instagram ? [{ name: 'Instagram', href: siteConfig.social.instagram, icon: Instagram }] : []),
    ...(siteConfig?.social?.github ? [{ name: 'Github', href: siteConfig.social.github, icon: Github }] : []),
  ]

  return (
    <footer className="bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]/50 section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-2xl font-bold text-[hsl(var(--foreground))] 
                       hover:text-[hsl(var(--primary))] transition-colors duration-300 mb-6 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] 
                            rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 
                            transition-transform duration-300">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--primary))] 
                             bg-clip-text text-transparent">
                {siteConfig?.branding.logo || 'Your Brand'}
              </span>
            </Link>
            
            <p className="text-body-sm text-[hsl(var(--muted-foreground))] mb-8 max-w-md leading-relaxed">
              {siteConfig?.branding.tagline}
            </p>
            
            {/* 只有当有社交媒体链接时才显示社交媒体区域 */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-12 h-12 bg-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--primary))] 
                               rounded-xl flex items-center justify-center transition-all duration-300 
                               hover:scale-110 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/25 
                               border border-[hsl(var(--border))]/50 hover:border-[hsl(var(--primary))]/50 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-5 h-5 text-[hsl(var(--foreground))] 
                                               group-hover:text-white transition-colors duration-300" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Product Links - 只有当有启用的产品功能时才显示 */}
          {footerLinks.product.length > 0 && (
            <div>
              <h3 className="heading-4 mb-6 text-[hsl(var(--foreground))]">{messages.product}</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] 
                               transition-colors duration-300 text-sm relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--primary))] 
                                     transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Links - 只有当有启用的支持功能时才显示 */}
          {footerLinks.support.length > 0 && (
            <div>
              <h3 className="heading-4 mb-6 text-[hsl(var(--foreground))]">{messages.support}</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] 
                               transition-colors duration-300 text-sm relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--primary))] 
                                     transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-[hsl(var(--border))]/50 mt-16 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              &copy; {new Date().getFullYear()} {siteConfig?.branding.logo}. {messages.rights}.
            </p>
            <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] text-sm">
              用❤️制作
              <span className="text-[hsl(var(--primary))]">Claude Code</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}