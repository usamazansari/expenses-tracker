import { Injectable, inject } from '@angular/core';
import { User } from 'firebase/auth';

import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { FirestorePocketbookService } from './firestore-pocketbook/firestore-pocketbook.service';
import { FirestoreTransactionService } from './firestore-transaction/firestore-transaction.service';
import { FirestoreUserService } from './firestore-user/firestore-user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  #pocketbook = inject(FirestorePocketbookService);
  #user = inject(FirestoreUserService);
  #transaction = inject(FirestoreTransactionService);

  watchOwnedPocketbookList$() {
    return this.#pocketbook.watchOwnedPocketbookList$();
  }

  watchCollaboratedPocketbookList$() {
    return this.#pocketbook.watchCollaboratedPocketbookList$();
  }

  watchPocketbook$(pocketbookId: string) {
    return this.#pocketbook.watchPocketbook$(pocketbookId);
  }

  createPocketbook$(pocketbook: IPocketbook) {
    return this.#pocketbook.createPocketbook$(pocketbook);
  }

  updatePocketbook$(pocketbook: Partial<IPocketbook>) {
    return this.#pocketbook.updatePocketbook$(pocketbook);
  }

  deletePocketbook$(pocketbookId: string) {
    return this.#pocketbook.deletePocketbook$(pocketbookId);
  }

  saveUser$(user: User) {
    return this.#user.saveUser$(user);
  }

  updateUser$(user: Partial<User>) {
    return this.#user.updateUser$(user);
  }

  watchUserList$() {
    return this.#user.watchUserList$();
  }

  watchPocketbookOwner$(pocketbookOwner: string) {
    return this.#user.watchPocketbookOwner$(pocketbookOwner);
  }

  watchPocketbookCollaboratorList$(pocketbookCollaboratorList: string[]) {
    return this.#user.watchPocketbookCollaboratorList$(pocketbookCollaboratorList);
  }

  watchTransactionList$() {
    return this.#transaction.watchTransactionList$();
  }

  watchTransaction$(transactionId: string) {
    return this.#transaction.watchTransaction$(transactionId);
  }

  createTransaction$(transaction: Partial<ITransaction>) {
    return this.#transaction.createTransaction$(transaction);
  }

  updateTransaction$(transaction: Partial<ITransaction>) {
    return this.#transaction.updateTransaction$(transaction);
  }

  deleteTransaction$(transactionId: string) {
    return this.#transaction.deleteTransaction$(transactionId);
  }
}
