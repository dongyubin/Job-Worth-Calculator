import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'config', 'site.json')
    const configFile = await fs.readFile(configPath, 'utf8')
    const config = JSON.parse(configFile)
    
    return NextResponse.json(config)
  } catch (error) {
    console.error('Error reading site config:', error)
    return NextResponse.json(
      { error: 'Failed to load site configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const updates = await request.json()
    const configPath = path.join(process.cwd(), 'config', 'site.json')
    
    // 读取现有配置
    const existingConfig = JSON.parse(await fs.readFile(configPath, 'utf8'))
    
    // 合并配置
    const updatedConfig = { ...existingConfig, ...updates }
    
    // 写入文件
    await fs.writeFile(configPath, JSON.stringify(updatedConfig, null, 2))
    
    return NextResponse.json(updatedConfig)
  } catch (error) {
    console.error('Error updating site config:', error)
    return NextResponse.json(
      { error: 'Failed to update site configuration' },
      { status: 500 }
    )
  }
}