import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService, ContextService, ErrorService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';
import { filter } from 'rxjs';

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
  editMode = signal<EditMode>('displayName');
  #router = inject(Router);
  #context = inject(ContextService);
  #auth = inject(AuthService);
  #notification = inject(NotificationService);
  #error = inject(ErrorService);

  user = computed(() => this.#context.user());

  fetchEditMode() {
    this.#router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const { url, urlAfterRedirects } = e as NavigationEnd;
      this.editMode.set((urlAfterRedirects ?? url)?.split('/').at(-1) as EditMode);
    });
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
