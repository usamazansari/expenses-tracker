import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';

@Injectable({
  providedIn: 'root'
})
export class PocketbookDetailService {
  #collaboratorList$ = new BehaviorSubject<User[]>([]);
  #collaboratorList: User[] = [];

  constructor(
    private _router: Router,
    private _context: ContextService,
    private _firestore: FirestoreService
  ) {}

  fetchCollaboratorList$() {
    this.watchPocketbook$()
      .pipe(switchMap(pb => this._firestore.watchCollaboratorList$(pb)))
      .subscribe(collaboratorList => {
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

  watchOwner$() {
    return this.watchPocketbook$().pipe(
      switchMap(pb => this._firestore.watchOwner$(pb) as Observable<User>)
    );
  }

  watchPocketbook$() {
    const pocketbookId = this._router.url.match(/pocketbook\/(\w+)\//)?.at(1);
    return this._context
      .watchPocketbook$()
      .pipe(
        switchMap(pb => (!pb ? this._firestore.watchPocketbook$(pocketbookId ?? '') : of(pb)))
      );
  }
}
