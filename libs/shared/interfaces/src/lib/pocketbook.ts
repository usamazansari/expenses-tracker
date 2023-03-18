import { DateOrTimestamp } from './common';

interface IPocketbook<T extends DateOrTimestamp = Date> {
  id: string;
  owner: string;
  name?: string;
  collaboratorList: string[];
  createdAt: T;
  transactionList: string[];
}

export { IPocketbook };
