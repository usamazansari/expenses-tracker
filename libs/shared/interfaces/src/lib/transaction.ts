import { DateOrTimestamp } from './common';

type TransactionDirection = 'income' | 'expense';

interface ITransaction<T extends DateOrTimestamp = Date> {
  id: string;
  pocketbook: string;
  timestamp: T;
  category: string;
  amount: number;
  direction: TransactionDirection;
  message: string;
}

export { ITransaction, TransactionDirection };
