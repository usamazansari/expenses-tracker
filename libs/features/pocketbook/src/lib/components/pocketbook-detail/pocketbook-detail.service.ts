import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject, switchMap } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookDetailService {
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #collaboratorList$ = new BehaviorSubject<User[]>([]);
  #owner$ = new BehaviorSubject<User | null>(null);
  #pocketbook: IPocketbook | null = null;
  #collaboratorList: User[] = [];
  #owner: User | null = null;

  constructor(private _context: ContextService, private _firestore: FirestoreService) {}

  initializeComponent() {
    // this._context.watchPocketbook$().subscribe(pocketbook => {
    //   this.setPocketbook(pocketbook as IPocketbook);
    // });
    // this._context
    //   .watchPocketbook$()
    //   .pipe(switchMap(pocketbook => this._firestore.watchPocketbookOwner$((pocketbook as IPocketbook)?.owner)))
    //   .subscribe(owner => {
    //     this.setOwner(owner as User);
    //   });
    // this._context
    //   .watchPocketbook$()
    //   .pipe(
    //     switchMap(pocketbook =>
    //       this._firestore.watchPocketbookCollaboratorList$((pocketbook as IPocketbook)?.collaboratorList)
    //     )
    //   )
    //   .subscribe(collaboratorList => {
    //     this.setCollaboratorList(collaboratorList as User[]);
    //   });
  }

  setPocketbook(pocketbook: IPocketbook | null) {
    this.#pocketbook = pocketbook ?? null;
    this.#pocketbook$.next(this.#pocketbook);
  }

  watchPocketbook$() {
    return this.#pocketbook$.asObservable();
  }

  setCollaboratorList(collaboratorList: User[]) {
    this.#collaboratorList = collaboratorList ?? [];
    this.#collaboratorList$.next(this.#collaboratorList);
  }

  watchCollaboratorList$() {
    return this.#collaboratorList$.asObservable();
  }

  setOwner(owner: User | null) {
    this.#owner = owner ?? null;
    this.#owner$.next(this.#owner);
  }

  watchOwner$() {
    return this.#owner$.asObservable();
  }
}
