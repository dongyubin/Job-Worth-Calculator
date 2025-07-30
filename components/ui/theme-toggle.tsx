'use client'

import { useState } from 'react'
import { useTheme as useNextTheme } from 'next-themes'
import { useTheme, colorThemes, type ColorTheme } from '@/components/providers/theme-provider'
import { Palette, Sun, Moon, ChevronDown, Check } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useNextTheme()
  const { colorTheme, setColorTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* 主按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsl(var(--border))] 
                   bg-[hsl(var(--background))]/80 backdrop-blur-sm hover:bg-[hsl(var(--muted))]/50 
                   transition-all duration-200 text-sm font-medium"
      >
        <Palette className="w-4 h-4 text-[hsl(var(--primary))]" />
        <span className="hidden sm:inline text-[hsl(var(--foreground))]">主题</span>
        <ChevronDown className={`w-4 h-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* 下拉面板 */}
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 主题选择面板 */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-[hsl(var(--background))] border border-[hsl(var(--border))] 
                         rounded-xl shadow-lg backdrop-blur-sm z-50 p-4">
            
            {/* 明暗模式切换 */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">明暗模式</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    theme === 'light'
                      ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                      : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 text-[hsl(var(--muted-foreground))]'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span className="text-xs">浅色</span>
                  {theme === 'light' && <Check className="w-3 h-3 ml-auto" />}
                </button>
                
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    theme === 'dark'
                      ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                      : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 text-[hsl(var(--muted-foreground))]'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span className="text-xs">深色</span>
                  {theme === 'dark' && <Check className="w-3 h-3 ml-auto" />}
                </button>
              </div>
            </div>

            {/* 颜色主题选择 */}
            <div>
              <h4 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3">颜色主题</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(colorThemes).map(([key, themeOption]) => {
                  const isActive = colorTheme === key
                  
                  return (
                    <button
                      key={key}
                      onClick={() => setColorTheme(key as ColorTheme)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-left ${
                        isActive
                          ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10'
                          : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50'
                      }`}
                    >
                      {/* 颜色预览 */}
                      <div className={`w-4 h-4 rounded-full ${themeOption.class}`}>
                        <div className="w-full h-full rounded-full bg-[hsl(var(--primary))]"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-medium ${
                          isActive ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]'
                        }`}>
                          {themeOption.name}
                        </div>
                      </div>
                      
                      {isActive && <Check className="w-3 h-3 text-[hsl(var(--primary))]" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 实时预览提示 */}
            <div className="mt-4 pt-3 border-t border-[hsl(var(--border))]">
              <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] justify-center">
                <div className="w-2 h-2 bg-[hsl(var(--success))] rounded-full animate-pulse"></div>
                主题更改将立即生效
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}