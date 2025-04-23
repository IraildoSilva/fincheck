import { Clothes } from './expense/clothes'
import { Education } from './expense/education'
import { Expense } from './expense/expense'
import { Food } from './expense/food'
import { Fun } from './expense/fun'
import { Grocery } from './expense/grocery'
import { Home } from './expense/home'
import { Transport } from './expense/transport'
import { Travel } from './expense/travel'
import { Income } from './income/income'
import { Shopee } from './income/shopee'
import { Transfer } from './transfer/transfer'

export const iconsMap = {
  income: {
    default: Income,
    shopee: Shopee,
  },
  transfer: {
    default: Transfer,
  },
  expense: {
    default: Expense,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
  },
}
