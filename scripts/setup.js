#!/usr/bin/env node

/**
 * 🚀 一键配置脚本
 * 运行命令：node scripts/setup.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function setupProject() {
  console.log('🚀 欢迎使用落地页快速配置工具！\n')
  
  // 收集用户信息
  const config = {}
  
  config.companyName = await question('📝 请输入您的公司名称: ')
  config.productName = await question('🏷️  请输入您的产品名称: ')
  config.tagline = await question('💡 请输入您的产品标语: ')
  config.description = await question('📖 请输入产品描述: ')
  config.email = await question('📧 请输入联系邮箱: ')
  config.phone = await question('📞 请输入联系电话: ')
  
  console.log('\n🎨 请选择主题风格:')
  console.log('1. modern - 现代简约')
  console.log('2. elegant - 优雅商务') 
  console.log('3. vibrant - 活力创新')
  
  const themeChoice = await question('请选择 (1-3): ')
  const themes = { '1': 'modern', '2': 'elegant', '3': 'vibrant' }
  config.theme = themes[themeChoice] || 'modern'
  
  // 生成site.json
  const siteConfig = {
    meta: {
      title: `${config.productName} - ${config.tagline}`,
      description: config.description,
      keywords: `${config.productName}, ${config.companyName}`,
      author: config.companyName,
      favicon: "/assets/images/favicon.ico",
      ogImage: "/assets/images/og-image.jpg"
    },
    branding: {
      logo: config.companyName,
      logoImage: "/assets/images/logo.png",
      tagline: config.tagline
    },
    contact: {
      email: config.email,
      phone: config.phone,
      address: "您的公司地址"
    },
    social: {
      twitter: "https://twitter.com/yourcompany",
      facebook: "https://facebook.com/yourcompany",
      linkedin: "https://linkedin.com/company/yourcompany",
      instagram: "https://instagram.com/yourcompany"
    },
    analytics: {
      googleAnalytics: "",
      googleAdsense: "",
      facebookPixel: ""
    },
    theme: {
      template: config.theme,
      variants: {
        modern: {
          name: "现代简约",
          description: "简洁现代的设计风格",
          primaryColor: "blue",
          style: "minimalist"
        },
        elegant: {
          name: "优雅商务", 
          description: "高端商务风格",
          primaryColor: "slate",
          style: "corporate"
        },
        vibrant: {
          name: "活力创新",
          description: "充满活力的创新风格", 
          primaryColor: "emerald",
          style: "creative"
        }
      }
    }
  }
  
  // 写入配置文件
  fs.writeFileSync(
    path.join(__dirname, '../config/site.json'),
    JSON.stringify(siteConfig, null, 2)
  )
  
  console.log('\n✅ 配置已生成！')
  console.log('📝 接下来请编辑 messages/zh.json 文件来修改页面文案')
  console.log('🚀 运行 npm run dev 来预览您的落地页')
  
  rl.close()
}

setupProject().catch(console.error)