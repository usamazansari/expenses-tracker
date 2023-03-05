import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookOwnerListService {
  #pocketbookList$ = new BehaviorSubject<IPocketbook[]>([]);
  #pocketbookList: IPocketbook[] = [];
  constructor(private _firestore: FirestoreService) {}

  fetchPocketbookList$() {
    this._firestore.getOwnedPocketbookList$().subscribe(pocketbookList => {
      this.setPocketbookList(pocketbookList);
    });
  }

  setPocketbookList(pocketbookList: IPocketbook[]) {
    console.log({ pocketbookList });
    this.#pocketbookList = pocketbookList ?? [];
    this.#pocketbookList$.next(this.#pocketbookList);
  }

  watchPocketbookList$() {
    return this.#pocketbookList$.asObservable();
  }
}
