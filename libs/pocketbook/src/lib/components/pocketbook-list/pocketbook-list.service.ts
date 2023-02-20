import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

export type UserPocketbookList = {
  owner: IPocketbook[];
  collaborator: IPocketbook[];
};

@Injectable({
  providedIn: 'root'
})
export class PocketbookListService {
  #pocketbookList$ = new BehaviorSubject<UserPocketbookList>({ owner: [], collaborator: [] });
  #pocketbookList: UserPocketbookList = { owner: [], collaborator: [] };

  constructor(private _router: Router, private _firestore: FirestoreService) {}

  fetchPocketbookList$() {
    this._firestore.getPocketbookList$().subscribe(pocketbookList => {
      this.setPocketbookList(pocketbookList);
    });
  }

  setPocketbookList(pocketbookList: UserPocketbookList) {
    this.#pocketbookList = pocketbookList;
    this.#pocketbookList$.next(this.#pocketbookList);
  }

  watchPocketbookList$() {
    return this.#pocketbookList$.asObservable();
  }

  gotoAddPocketbook() {
    this._router.navigate(['pocketbook', 'add']);
  }
}
