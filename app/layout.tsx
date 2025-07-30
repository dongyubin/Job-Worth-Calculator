import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConfigProvider } from '@/components/providers/config-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Job Worth Calculator',
  description: 'Scientifically evaluate your job\'s cost-effectiveness',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        <ConfigProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem
            storageKey="ui-theme"
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  )
}