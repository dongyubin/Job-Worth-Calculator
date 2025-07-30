import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get('locale') || 'zh'
    
    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`)
    const messagesFile = await fs.readFile(messagesPath, 'utf8')
    const messages = JSON.parse(messagesFile)
    
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error reading messages:', error)
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    )
  }
}