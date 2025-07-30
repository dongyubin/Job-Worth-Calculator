import { LanguageProvider } from '@/components/calculator/LanguageContext'
import SalaryCalculator from '@/components/calculator/calculator'

export default function CalculatorPage() {
  return (
    <LanguageProvider>
      <SalaryCalculator />
    </LanguageProvider>
  )
}