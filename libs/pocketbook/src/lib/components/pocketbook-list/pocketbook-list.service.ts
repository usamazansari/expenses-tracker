import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListService {
  #pocketbookList$ = new BehaviorSubject<IPocketbook[]>([]);
  #pocketbookList: IPocketbook[] = [];

  constructor(private _router: Router, private _firestore: FirestoreService) {}

  fetchPocketbookList$() {
    this._firestore.getPocketbookList$().subscribe(pocketbookList => {
      this.setPocketbookList(pocketbookList);
    });
  }

  setPocketbookList(pocketbookList: IPocketbook[] = []) {
    this.#pocketbookList = pocketbookList ?? [];
    this.#pocketbookList$.next(pocketbookList);
  }

  watchPocketbookList$() {
    return this.#pocketbookList$.asObservable();
  }

  gotoAddPocketbook() {
    this._router.navigate(['pocketbook', 'add']);
  }
}
