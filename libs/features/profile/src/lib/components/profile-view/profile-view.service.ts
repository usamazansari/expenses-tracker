import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  user: IFlag;
  logout: IFlag;
  ownedPocketbookListCount: IFlag;
  collaboratedPocketbookListCount: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileViewService {
  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #router = inject(Router);
  #clipboard = inject(Clipboard);

  watchUser$() {
    return this.#context.watchUser$();
  }

  watchOwnedPocketbookListCount$() {
    return this.#firestore.watchOwnedPocketbookListCount$();
  }

  watchCollaboratedPocketbookListCount$() {
    return this.#firestore.watchCollaboratedPocketbookListCount$();
  }
}
