import { DateOrTimestamp } from './common';

interface IBalance<T extends DateOrTimestamp = Date> {
  timestamp: T;
  amount: number;
}

interface IPocketbook<T extends DateOrTimestamp = Date> {
  id: string;
  owner: string;
  name?: string;
  collaboratorList: string[];
  createdAt: T;
  transactionList: string[];
  balance: IBalance;
}

export { IPocketbook };
