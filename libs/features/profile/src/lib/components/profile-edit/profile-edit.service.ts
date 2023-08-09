import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { AuthService, ContextService, ErrorService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type EditMode = 'displayName' | 'password';

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

  editMode = signal<EditMode>('displayName');
  user = computed(() => this.#context.user());

  fetchEditMode() {
    const url = this.#router.url.split('/').at(-1) as EditMode;
    this.editMode.set(url);
  }

  gotoEditProperty(property: EditMode = 'displayName') {
    this.editMode.set(property);
    this.#router.navigate([RoutePaths.Profile, RoutePaths.EntityEdit, property]);
  }

  editDisplayName$(displayName: string) {
    return this.#auth.updateDisplayName$(displayName).pipe(
      tap(() => {
        this.#notification.success({
          title: 'Success',
          description: 'Your display name has been updated.'
        });
        this.#router.navigate([RoutePaths.Profile]);
      })
    );
  }

  cancelEdit() {
    this.#router.navigate([RoutePaths.Profile]);
  }
}
