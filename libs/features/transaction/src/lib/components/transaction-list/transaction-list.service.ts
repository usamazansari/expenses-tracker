import { Injectable } from '@angular/core';
import { FirestoreService } from '@expenses-tracker/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  constructor(private _firestore: FirestoreService) {}

  watchTransactionList$() {
    return this._firestore.watchTransactionList$();
  }
}
