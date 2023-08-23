import { PaymentMode, TransactionCategory, TransactionDirection } from '@expenses-tracker/shared/interfaces';

export type TransactionForm = {
  amount: number;
  category: TransactionCategory;
  direction: TransactionDirection;
  message: string;
  paymentMode: PaymentMode;
  timestamp: Date;
};
