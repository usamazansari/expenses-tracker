import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

import { toObservable } from '@angular/core/rxjs-interop';
import { ContextService } from '@expenses-tracker/core';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';
import { RoutePaths } from '@expenses-tracker/shared/common';

export type ComponentFlags = {
  contributorsFetch: IFlag;
  pocketbookFetch: IFlag;
};

export type ViewMode = RoutePaths.Transaction | RoutePaths.EntitySettings;

@Injectable({
  providedIn: 'root'
})
export class PocketbookDetailService {
  #context = inject(ContextService);
  #router = inject(Router);
  pocketbookFromContext = computed(() => this.#context.pocketbook());
  pocketbook = signal<IPocketbook | null>(null);
  collaboratorList = signal<User[]>([]);
  owner = signal<User | null>(null);
  viewMode = signal<ViewMode>(RoutePaths.Transaction);
  flags = signal<ComponentFlags>({
    contributorsFetch: INITIAL_FLAGS,
    pocketbookFetch: INITIAL_FLAGS
  });

  constructor() {
    // TODO: @usamazansari: Pocketbook data is not fetched on page reload
    toObservable(this.pocketbookFromContext).subscribe(pb => {
      if (!pb) return;
      const { owner, collaboratorList, ...pocketbook } = pb;
      this.pocketbook.set(pocketbook as IPocketbook);
      this.owner.set(owner as User);
      this.collaboratorList.set(collaboratorList as User[]);
    });
  }

  gotoTransactionList() {
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.Transaction]);
  }

  gotoSettings() {
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.EntitySettings]);
  }

  addTransaction() {
    this.#router.navigate([RoutePaths.Pocketbook, this.pocketbook()?.id, RoutePaths.Transaction, RoutePaths.EntityAdd]);
  }

  // initializeComponent() {
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
  // }
}
