import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://jobworthcalculator.wwkejishe.top'
  const supportedLocales = ['zh', 'en', 'ja']
  
  // Main pages for each locale
  const pages = [
    '', // home page
    '/calculator',
    '/share',
    // Add more pages as needed
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${supportedLocales.map(locale => 
  pages.map(page => {
    const url = `${baseUrl}/${locale}${page}`
    const alternates = supportedLocales
      .filter(l => l !== locale)
      .map(altLocale => `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}${page}"/>`)
      .join('\n')
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
${alternates}
  </url>`
  }).join('\n')
).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}