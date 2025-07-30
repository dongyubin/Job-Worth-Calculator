'use client'

import React from 'react'
import SalaryCalculator from '@/components/calculator/calculator'

interface CalculatorProps {
  messages?: any
  locale?: string
  config?: any
}

export function Calculator({ messages, locale, config }: CalculatorProps) {
  return (
    <section id="calculator" className="pt-24 pb-8">
      <SalaryCalculator />
    </section>
  )
}