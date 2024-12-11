import { NumericFormat } from 'react-number-format'
import { cn } from '@/lib/utils'

interface InputCurrencyProps {
  onChange: (value: string) => void
  value?: string | number
}

export function InputCurrency({ onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        decimalSeparator=","
        thousandSeparator="."
        defaultValue={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full text-[32px] bg-transparent font-bold tracking-[-1px] outline-none'
        )}
      />
    </div>
  )
}
