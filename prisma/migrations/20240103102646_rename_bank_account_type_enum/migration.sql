/*
  Warnings:

  - Changed the type of `type` on the `bank_accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "banck_account_type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "type",
ADD COLUMN     "type" "banck_account_type" NOT NULL;

-- DropEnum
DROP TYPE "BankAccountType";
