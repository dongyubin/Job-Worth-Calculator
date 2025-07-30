import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import Image from 'next/image'
import Link from 'next/link'
import { Users } from 'lucide-react'

interface TeamSectionProps {
  messages: any
  config?: any
}

export function Team({ messages }: TeamSectionProps) {
  if (!messages?.members) {
    return null
  }

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
      default:
        return null;
    }
  }

  return (
    <section id="team" className="section-padding section-divider">
      <div className="container-custom">
        <div className="text-center mb-20 section-divider animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary))]/10 
                        border border-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            团队介绍
          </div>
          
          <h2 className="heading-2 mb-6">
            <span className="text-gradient">{messages.title || "Our Team"}</span>
          </h2>
          
          {messages.subtitle && (
            <p className="text-body text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
              {messages.subtitle}
            </p>
          )}
        </div>
        <div className="grid-features">
          {messages.members.map((member: any, index: number) => (
            <div 
              key={index} 
              className="card feature-card group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Enhanced member image */}
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <div className="aspect-square overflow-hidden">
                  {member.imageUrl && member.imageUrl.trim() !== '' ? (
                    <Image
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={300}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 
                                  flex items-center justify-center relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] 
                                    rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {member.firstName?.[0] || member.name?.[0] || '?'}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Online indicator */}
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-[hsl(var(--success))] 
                              rounded-full border-2 border-[hsl(var(--background))] animate-pulse"></div>
              </div>
              
              {/* Member info */}
              <div className="text-center">
                <h3 className="heading-4 mb-3 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] 
                              transition-colors duration-300">
                  {member.firstName} <span className="text-[hsl(var(--primary))]">{member.lastName}</span>
                </h3>
                
                <div className="mb-6 space-y-2">
                  {member.positions?.map((position: string, posIndex: number) => (
                    <div key={posIndex} className="inline-block px-3 py-1 bg-[hsl(var(--accent))]/50 
                                                   text-[hsl(var(--accent-foreground))] text-xs rounded-full 
                                                   border border-[hsl(var(--border))]/50 mr-2 mb-2">
                      {position}
                    </div>
                  ))}
                </div>
                
                {/* Social networks */}
                {member.socialNetworks && member.socialNetworks.length > 0 && (
                  <div className="flex justify-center space-x-3">
                    {member.socialNetworks.map(({ name, url }: any, socialIndex: number) => (
                      <Link
                        key={socialIndex}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[hsl(var(--accent))]/50 hover:bg-[hsl(var(--primary))] 
                                 rounded-full flex items-center justify-center transition-all duration-300 
                                 hover:scale-110 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/25 
                                 border border-[hsl(var(--border))]/50 hover:border-[hsl(var(--primary))]/50 group/social"
                      >
                        <span className="sr-only">{name}</span>
                        <div className="text-[hsl(var(--foreground))] group-hover/social:text-white transition-colors duration-300">
                          {socialIcon(name)}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}