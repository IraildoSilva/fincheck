import { TransactionType } from '@prisma/client'

export const QUERY_KEYS = {
  transactions: ['transactions'],
}

export const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export const VerboseMonths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

type MessageMap = Record<TransactionType, string>

export const creationMessageByTransactionType: MessageMap = {
  EXPENSE: 'Despesa cadastrada com sucesso!',
  INCOME: 'Receita cadastrada com sucesso!',
  TRANSFER: 'Transferência cadastrada com sucesso!',
}

export const updateMessageByTransactionType: MessageMap = {
  EXPENSE: 'Despesa editada com sucesso!',
  INCOME: 'Receita editada com sucesso!',
  TRANSFER: 'Transferência editada com sucesso!',
}
