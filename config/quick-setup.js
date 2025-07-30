/**
 * 🚀 快速配置工具
 * 修改下面的配置，然后运行 npm run dev 即可看到效果
 */

export const QUICK_CONFIG = {
  // 🏢 基本信息
  companyName: '您的公司名称',
  productName: '您的产品名称', 
  tagline: '您的产品标语',
  description: '您的产品描述，用于SEO优化',
  
  // 📞 联系方式
  email: 'contact@yourcompany.com',
  phone: '+1 (555) 123-4567',
  address: '您的公司地址',
  
  // 🌐 社交媒体
  twitter: 'https://twitter.com/yourcompany',
  linkedin: 'https://linkedin.com/company/yourcompany',
  
  // 🎨 主题选择 (modern | elegant | vibrant)
  theme: 'modern',
  
  // 📈 分析工具
  googleAnalytics: '', // 如：G-XXXXXXXXXX
}

// 🎯 功能开关 - 控制哪些区块显示
export const SECTIONS = {
  hero: true,        // 首页横幅
  sponsors: true,    // 合作伙伴
  benefits: true,    // 核心优势
  features: true,    // 功能特性
  testimonials: true, // 客户评价
  team: true,        // 团队介绍
  community: true,   // 社区
  showcase: true,    // 项目展示
  pricing: false,    // 价格方案
  faq: true,         // 常见问题
  services: true,    // 服务介绍
  contact: true,     // 联系我们
}

/**
 * 💡 使用说明：
 * 1. 修改上面的配置信息
 * 2. 运行 npm run dev
 * 3. 在 messages/zh.json 中修改具体的文案内容
 * 4. 完成！您的落地页就可以上线了
 */