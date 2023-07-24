import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, ContextService, ErrorService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  edit: IFlag;
};

export type ComponentForm = {
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

  cancelEdit() {
    this.#router.navigate([RoutePaths.Profile]);
  }
}
