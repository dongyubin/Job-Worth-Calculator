import { LandingPage } from '@/components/landing-page'

interface HomePageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  
  return <LandingPage locale={locale} />
}
