import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RoutePaths } from '@expenses-tracker/shared/common';

export type PocketbookViewMode = 'owner' | 'collaborator';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListService {
  #router = inject(Router);

  gotoAddPocketbook() {
    this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityAdd]);
  }
}
