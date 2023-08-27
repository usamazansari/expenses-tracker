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
  pocketbookId: string;
  timestamp: T;
  category: TransactionCategory;
  amount: number;
  direction: TransactionType;
  message: string;
  paymentMode: PaymentMode;
}

export { ITransaction, TransactionType, TransactionCategory, PaymentMode };
