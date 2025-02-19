const transactions = [
  {
    message: 'Primeira',
    date: new Date('2025-02-17 15:19:01.538'),
    createdAt: new Date('2025-02-18 15:19:02.538'),
  },
  {
    message: 'terceira',
    date: new Date('2025-02-17 15:19:01.538'),
    createdAt: new Date('2025-02-18 15:10:02.538'),
  },
  {
    message: 'segunda',
    date: new Date('2025-02-17 15:19:01.538'),
    createdAt: new Date('2025-02-18 15:11:02.538'),
  },
  {
    message: 'zero',
    date: new Date('2025-02-19 15:19:01.538'),
    createdAt: new Date('2025-02-18 15:11:02.538'),
  },
]

const sortedTransactions = transactions.sort((a, b) => {
  const ADate = new Date(a.date).getTime()
  const BDate = new Date(b.date).getTime()

  if (ADate === BDate) {
    const ACreatedAt = new Date(a.createdAt).getTime()
    const BCreatedAt = new Date(b.createdAt).getTime()

    return BCreatedAt - ACreatedAt // Em caso de empate, ordena por createdAt
  }

  return BDate - ADate // Ordena por data
})

console.log(sortedTransactions)
