import { Injectable, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { ContextService } from '@expenses-tracker/core';
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

  initializeComponent() {
    this.setPocketbook(this.#context.getPocketbook() as IPocketbook);
    this.setOwner(this.#context.getUser() as User);
    this.setCollaboratorList(this.#context.getCollaboratorList() as User[]);
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
