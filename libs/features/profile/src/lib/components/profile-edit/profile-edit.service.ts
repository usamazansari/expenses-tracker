import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, ContextService, ErrorService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  edit: { displayName: IFlag; password: IFlag };
};

export type DisplayNameEditForm = {
  displayName: string;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {
  #router = inject(Router);
  #context = inject(ContextService);
  #auth = inject(AuthService);
  #notification = inject(NotificationService);
  #error = inject(ErrorService);

  watchUser$() {
    return this.#context.watchUser$();
  }

  gotoEditProperty(property: 'displayName' | 'password') {
    this.#router.navigate([RoutePaths.Profile, RoutePaths.EntityEdit, property]);
  }

  editDisplayName$(displayName: string) {
    return this.#auth.updateDisplayName$(displayName);
  }

  cancelEdit() {
    this.#router.navigate([RoutePaths.Profile]);
  }
}
