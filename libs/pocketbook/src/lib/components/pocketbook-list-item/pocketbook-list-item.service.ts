import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListItemService {
  #collaboratorList$ = new BehaviorSubject<User[]>([]);
  #collaboratorList: User[] = [];

  constructor(private _firestore: FirestoreService) {}

  fetchCollaboratorList$(pocketbook: IPocketbook) {
    this._firestore.watchCollaboratorList$(pocketbook).subscribe(collaboratorList => {
      this.setCollaboratorList(collaboratorList as User[]);
    });
  }

  setCollaboratorList(collaboratorList: User[]) {
    this.#collaboratorList = collaboratorList ?? [];
    this.#collaboratorList$.next(this.#collaboratorList);
  }

  watchCollaboratorList$() {
    return this.#collaboratorList$.asObservable();
  }
}
