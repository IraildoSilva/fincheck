export interface Transaction {
  id: string
  name: string
  value: number
  date: string
  createdAt: string
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  categoryId: string | null
  bankAccountId: string
  bankAccount: {
    name: string
    color: string
  }
  category?: {
    id: string
    name: string
    icon: string
  } | null
}
