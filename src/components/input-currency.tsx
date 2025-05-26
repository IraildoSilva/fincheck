import { NumericFormat } from 'react-number-format'
import { cn } from '@/lib/utils'

interface InputCurrencyProps {
  onChange: (value: string) => void
  value?: string | number
  disabled?: boolean
}

export function InputCurrency({
  onChange,
  value,
  disabled,
}: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        disabled={disabled}
        decimalSeparator=","
        thousandSeparator="."
        decimalScale={2}
        defaultValue={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full text-[32px] bg-transparent font-bold tracking-[-1px] outline-none disabled:cursor-not-allowed disabled:text-muted-foreground'
        )}
      />
    </div>
  )
}
