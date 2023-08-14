import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RoutePaths } from '@expenses-tracker/shared/common';
import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  pocketbookList: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class PocketbookListService {
  #router = inject(Router);
  #context = inject(ContextService);
  #firestore = inject(FirestoreService);

  user = computed(() => this.#context.user());

  fetchPocketbookList() {
    return this.#firestore.watchPocketbookList$();
  }

  gotoAddPocketbook() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityAdd]);
  }
}
