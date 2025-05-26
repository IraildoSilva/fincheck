export function formatCurrency(value: number) {
  return Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency',
  }).format(value)
}
