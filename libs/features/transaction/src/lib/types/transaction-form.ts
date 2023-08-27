import { PaymentMode, TransactionCategory, TransactionType } from '@expenses-tracker/shared/interfaces';

export type TransactionForm = {
  amount: number;
  category: TransactionCategory;
  transactionType: TransactionType;
  // TODO: @usamazansari: change to description
  message: string;
  paymentMode: PaymentMode;
  // TODO: @usamazansari: change to transactionDate
  timestamp: Date;
};
