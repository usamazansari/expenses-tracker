import { PaymentMode, TransactionDirection } from '@expenses-tracker/shared/interfaces';

export type TransactionForm = {
  category: string;
  amount: number;
  direction: TransactionDirection;
  message: string;
  timestamp: Date;
  paymentMode: PaymentMode;
};
