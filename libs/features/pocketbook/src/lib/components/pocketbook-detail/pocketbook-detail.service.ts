import { Injectable, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

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

  #context = inject(ContextService);
  #firestore = inject(FirestoreService);

  initializeComponent() {
    this.#context.watchPocketbook$().subscribe(pocketbook => {
      this.setPocketbook(pocketbook as IPocketbook);
    });
    this.#firestore
      .watchPocketbookOwner$((this.#pocketbook as IPocketbook)?.owner)
      .subscribe(owner => {
        this.setOwner(owner as User);
      });
    this.#firestore
      .watchPocketbookCollaboratorList$((this.#pocketbook as IPocketbook)?.collaboratorList)
      .subscribe(collaboratorList => {
        this.setCollaboratorList(collaboratorList as User[]);
      });
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
