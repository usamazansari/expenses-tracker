import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';
import { Timestamp } from 'firebase/firestore';

const PocketbookMapper = (pocketbook: IPocketbook<Timestamp>): IPocketbook => ({
  ...pocketbook,
  createdAt: pocketbook.createdAt.toDate()
});

const TransactionMapper = (transaction: ITransaction<Timestamp>): ITransaction => ({
  ...transaction,
  timestamp: transaction.timestamp.toDate()
});

export { PocketbookMapper, TransactionMapper };
