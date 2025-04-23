-- AlterEnum
ALTER TYPE "transation_type" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "to_bank_account_id" UUID;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_to_bank_account_id_fkey" FOREIGN KEY ("to_bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
