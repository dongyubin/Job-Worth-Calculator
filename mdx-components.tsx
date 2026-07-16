import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Calculator } from 'lucide-react'

function CalculatorCta({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <div className="my-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-5">
      <Link href={href} className="btn btn-gradient btn-default group">
        <Calculator className="h-4 w-4" />
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mb-3 mt-10 text-2xl font-semibold text-[hsl(var(--foreground))]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-7 text-xl font-semibold text-[hsl(var(--foreground))]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-8 text-[hsl(var(--muted-foreground))]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-[hsl(var(--muted-foreground))]">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-8">{children}</li>,
  a: ({ href = '', children }) => (
    <Link href={href} className="font-medium text-[hsl(var(--primary))] underline-offset-4 hover:underline">
      {children}
    </Link>
  ),
  CalculatorCta,
}

export function useMDXComponents(): MDXComponents {
  return components
}
