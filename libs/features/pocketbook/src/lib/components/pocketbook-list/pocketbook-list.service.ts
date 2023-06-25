import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

import { RoutePaths } from '@expenses-tracker/shared/common';

export type PocketbookViewMode = 'owner' | 'collaborator';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListService {
  #viewMode$ = new BehaviorSubject<PocketbookViewMode>('owner');
  #viewMode: PocketbookViewMode = 'owner';

  #router = inject(Router);

  fetchViewMode() {
    this.#router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const { url, urlAfterRedirects } = e as NavigationEnd;
      this.setViewMode((urlAfterRedirects ?? url)?.split('/').at(-1) as PocketbookViewMode);
    });
  }

  setViewMode(viewMode: PocketbookViewMode = 'owner') {
    this.#viewMode = viewMode;
    this.#viewMode$.next(this.#viewMode);
  }

  watchViewMode$() {
    return this.#viewMode$.asObservable();
  }

  gotoAddPocketbook() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityAdd]);
  }

  gotoOwnerPocketbookList() {
    this.setViewMode('owner');
    this.#router.navigate([
      RoutePaths.Pocketbook,
      RoutePaths.EntityList,
      RoutePaths.PocketbookOwner
    ]);
  }

  gotoCollaboratorPocketbookList() {
    this.setViewMode('collaborator');
    this.#router.navigate([
      RoutePaths.Pocketbook,
      RoutePaths.EntityList,
      RoutePaths.PocketbookCollaborator
    ]);
  }
}
