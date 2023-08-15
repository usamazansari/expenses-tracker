import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { RoutePaths } from '@expenses-tracker/shared/common';
import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';
import { catchError, of, tap } from 'rxjs';

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
  flags = signal<ComponentFlags>({
    pocketbookList: { ...INITIAL_FLAGS }
  });

  user = computed(() => this.#context.user());

  fetchPocketbookList() {
    this.flags.update(value => ({
      ...value,
      pocketbookList: { ...value.pocketbookList, loading: true }
    }));
    return this.#firestore.watchPocketbookList$().pipe(
      tap(() => {
        this.flags.update(value => ({
          ...value,
          pocketbookList: { ...value.pocketbookList, loading: false, success: true, fail: false }
        }));
      }),
      catchError(() => {
        this.flags.update(value => ({
          ...value,
          pocketbookList: { ...value.pocketbookList, loading: false, success: false, fail: true }
        }));
        return of([] as IPocketbook<Date>[]);
      })
    );
  }

  gotoAddPocketbook() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityAdd]);
  }
}
