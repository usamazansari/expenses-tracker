import { PaymentMode, TransactionCategory, TransactionType } from '@expenses-tracker/shared/interfaces';

export type TransactionForm = {
  amount: number;
  category: TransactionCategory;
  transactionType: TransactionType;
  description: string;
  paymentMode: PaymentMode;
  transactionDate: Date;
};
