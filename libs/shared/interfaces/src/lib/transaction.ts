import { DateOrTimestamp } from './common';

type PaymentMode = 'card' | 'cash';

type TransactionCategory =
  | 'academics'
  | 'atm-withdrawal'
  | 'bills'
  | 'carry-forward'
  | 'charity'
  | 'groceries'
  | 'health'
  | 'hobby'
  | 'insurance'
  | 'investment'
  | 'laundry'
  | 'leisure'
  | 'other'
  | 'rent'
  | 'salary'
  | 'shopping'
  | 'transportation'
  | 'trips';

type TransactionType = 'income' | 'expense';

interface ITransaction<T extends DateOrTimestamp = Date> {
  id: string;
  amount: number;
  category: TransactionCategory;
  description: string;
  paymentMode: PaymentMode;
  transactionDate: T;
  transactionType: TransactionType;
  pocketbookId: string;
}

type TransactionDAO = Omit<ITransaction, 'id' | 'pocketbookId'>;

export { ITransaction, TransactionType, TransactionCategory, PaymentMode, TransactionDAO };
