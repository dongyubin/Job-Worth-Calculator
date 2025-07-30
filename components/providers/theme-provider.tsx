'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

// 可用的颜色主题
export const colorThemes = {
  orange: {
    name: '活力橙',
    description: '温暖活力的橙色主题',
    class: 'theme-orange'
  },
  blue: {
    name: '商务蓝',
    description: '专业商务的蓝色主题', 
    class: 'theme-blue'
  },
  green: {
    name: '自然绿',
    description: '清新自然的绿色主题',
    class: 'theme-green'
  },
  purple: {
    name: '神秘紫',
    description: '优雅神秘的紫色主题',
    class: 'theme-purple'
  },
  pink: {
    name: '浪漫粉',
    description: '温柔浪漫的粉色主题',
    class: 'theme-pink'
  }
} as const

export type ColorTheme = keyof typeof colorThemes

// 主题上下文
interface ThemeContextType {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// 自定义主题提供器
export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue')
  const [mounted, setMounted] = useState(false)

  // 只在客户端挂载后执行
  useEffect(() => {
    setMounted(true)
    // 从localStorage恢复主题
    const saved = localStorage.getItem('color-theme') as ColorTheme
    if (saved && saved in colorThemes) {
      setColorTheme(saved)
    }
  }, [])

  // 应用颜色主题
  useEffect(() => {
    if (!mounted) return
    
    // 移除所有主题类
    Object.values(colorThemes).forEach(theme => {
      document.documentElement.classList.remove(theme.class)
    })
    
    // 添加当前主题类
    document.documentElement.classList.add(colorThemes[colorTheme].class)
    
    // 保存到localStorage
    localStorage.setItem('color-theme', colorTheme)
  }, [colorTheme, mounted])

  // 避免服务端渲染不匹配
  if (!mounted) {
    return <ThemeContext.Provider value={{ colorTheme: 'blue', setColorTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  }

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 组合的主题提供器
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <CustomThemeProvider>
        {children}
      </CustomThemeProvider>
    </NextThemesProvider>
  )
}