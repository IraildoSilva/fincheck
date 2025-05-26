/*
  Warnings:

  - You are about to alter the column `initial_balance` on the `bank_accounts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `value` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "bank_accounts" ALTER COLUMN "initial_balance" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "value" SET DATA TYPE DECIMAL(12,2);
