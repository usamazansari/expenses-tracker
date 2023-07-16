import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { catchError, of, tap } from 'rxjs';

import { AuthService, ErrorService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentForm = {
  email: string;
  password: string;
};

export type ComponentFlags = {
  login: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #router = inject(Router);
  #auth = inject(AuthService);
  #notification = inject(NotificationService);
  #error = inject(ErrorService);

  login$({ email, password }: ComponentForm) {
    return this.#auth.login$({ email, password }).pipe(
      tap(({ user }) => {
        this.#notification.success({
          description: `Logged in as ${user?.displayName ?? user?.email}`,
          title: 'Login successful!'
        });
        this.#router.navigate([RoutePaths.Profile]);
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this.#error.getError(code);
        this.#notification.error({
          description: `${error}.`,
          title: 'Login failed'
        });
        return of(error);
      })
    );
  }
}
