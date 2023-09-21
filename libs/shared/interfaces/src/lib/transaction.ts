import { DateOrTimestamp } from './common';

type TransactionListViewTypes = 'monthly' | 'daily' | 'weekly';

type TransactionListDatePipeArgs = 'MMMM YYYY' | 'ww' | 'longDate';

interface ITransactionListSummary {
  income: number;
  expense: number;
  cashIncome: number;
  cashExpense: number;
  cardIncome: number;
  cardExpense: number;
}

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

type TransactionFormSaveMode = 'add' | 'edit' | 'add-another';

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

export {
  ITransaction,
  ITransactionListSummary,
  PaymentMode,
  TransactionCategory,
  TransactionDAO,
  TransactionFormSaveMode,
  TransactionListDatePipeArgs,
  TransactionListViewTypes,
  TransactionType
};
