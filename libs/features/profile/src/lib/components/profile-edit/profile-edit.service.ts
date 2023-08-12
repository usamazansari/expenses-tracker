import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { catchError, of, tap } from 'rxjs';

import { AuthService, ContextService, ErrorService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

export type EditMode = 'displayName' | 'password';

export type ComponentFlags = {
  edit: { displayName: IFlag; password: IFlag };
};

export type DisplayNameEditForm = {
  displayName: string;
};

export type PasswordEditForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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
  flags = signal<ComponentFlags>({
    edit: { displayName: INITIAL_FLAGS, password: INITIAL_FLAGS }
  });

  fetchEditMode() {
    const url = this.#router.url.split('/').at(-1) as EditMode;
    this.editMode.set(url);
  }

  gotoEditProperty(property: EditMode = 'displayName') {
    this.editMode.set(property);
    this.#router.navigate([RoutePaths.Profile, RoutePaths.EntityEdit, property]);
  }

  editDisplayName$(displayName: string) {
    this.flags.update(value => ({
      ...value,
      edit: {
        ...value.edit,
        displayName: { ...value.edit.displayName, loading: true }
      }
    }));
    return this.#auth.updateDisplayName$(displayName).pipe(
      tap(() => {
        this.#notification.success({
          title: 'Success',
          description: 'Your display name has been updated.'
        });
        this.flags.update(value => ({
          ...value,
          edit: {
            ...value.edit,
            displayName: { ...value.edit.displayName, loading: false, success: true, fail: false }
          }
        }));
        this.#router.navigate([RoutePaths.Profile]);
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this.#error.getError(code);
        this.#notification.error({
          description: `${error}.`,
          title: 'Login failed'
        });
        this.flags.update(value => ({
          ...value,
          edit: {
            ...value.edit,
            displayName: { ...value.edit.displayName, loading: false, success: false, fail: true }
          }
        }));
        return of(error);
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  editPassword$({ oldPassword, newPassword, confirmNewPassword }: PasswordEditForm) {
    throw new Error('Method not implemented.');
  }

  cancelEdit() {
    this.#router.navigate([RoutePaths.Profile]);
  }
}
