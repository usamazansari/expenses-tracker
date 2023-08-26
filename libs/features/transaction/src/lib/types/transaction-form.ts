import { PaymentMode, TransactionCategory, TransactionDirection } from '@expenses-tracker/shared/interfaces';

export type TransactionForm = {
  amount: number;
  category: TransactionCategory;
  // TODO: @usamazansari: change to transactionType
  direction: TransactionDirection;
  // TODO: @usamazansari: change to description
  message: string;
  paymentMode: PaymentMode;
  // TODO: @usamazansari: change to transactionDate
  timestamp: Date;
};
