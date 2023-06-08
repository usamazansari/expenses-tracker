import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookCollaboratorListService {
  #pocketbookList$ = new BehaviorSubject<IPocketbook[]>([]);
  #pocketbookList: IPocketbook[] = [];
  #firestore = inject(FirestoreService);

  fetchPocketbookList$() {
    this.#firestore.watchCollaboratedPocketbookList$().subscribe(pocketbookList => {
      this.setPocketbookList(pocketbookList);
    });
  }

  setPocketbookList(pocketbookList: IPocketbook[]) {
    this.#pocketbookList = pocketbookList ?? [];
    this.#pocketbookList$.next(this.#pocketbookList);
  }

  watchPocketbookList$() {
    return this.#pocketbookList$.asObservable();
  }
}
