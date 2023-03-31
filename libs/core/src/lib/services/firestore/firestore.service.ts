import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';

import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { FirestorePocketbookService } from './firestore-pocketbook/firestore-pocketbook.service';
import { FirestoreTransactionService } from './firestore-transaction/firestore-transaction.service';
import { FirestoreUserService } from './firestore-user/firestore-user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private _pocketbook: FirestorePocketbookService,
    private _user: FirestoreUserService,
    private _transaction: FirestoreTransactionService
  ) {}

  watchOwnedPocketbookList$() {
    return this._pocketbook.watchOwnedPocketbookList$();
  }

  watchCollaboratedPocketbookList$() {
    return this._pocketbook.watchCollaboratedPocketbookList$();
  }

  watchPocketbook$(pocketbookId: string) {
    return this._pocketbook.watchPocketbook$(pocketbookId);
  }

  createPocketbook$(pocketbook: IPocketbook) {
    return this._pocketbook.createPocketbook$(pocketbook);
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._pocketbook.updatePocketbook$(pocketbook);
  }

  deletePocketbook$(pocketbookId: string) {
    return this._pocketbook.deletePocketbook$(pocketbookId);
  }

  saveUser$(user: User) {
    return this._user.saveUser$(user);
  }

  updateUser$(user: Partial<User>) {
    return this._user.updateUser$(user);
  }

  watchUserList$() {
    return this._user.watchUserList$();
  }

  watchPocketbookOwner$(pocketbookOwner: string) {
    return this._user.watchPocketbookOwner$(pocketbookOwner);
  }

  watchPocketbookCollaboratorList$(pocketbookCollaboratorList: string[]) {
    return this._user.watchPocketbookCollaboratorList$(pocketbookCollaboratorList);
  }

  watchTransactionList$() {
    return this._transaction.watchTransactionList$();
  }

  createTransaction$(transaction: Partial<ITransaction>) {
    return this._transaction.createTransaction$(transaction);
  }

  updateTransaction$(transaction: Partial<ITransaction>) {
    return this._transaction.updateTransaction$(transaction);
  }

  deleteTransaction$(transactionId: string) {
    return this._transaction.deleteTransaction$(transactionId);
  }
}
