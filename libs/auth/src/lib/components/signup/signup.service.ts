import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { catchError, of, switchMap, tap } from 'rxjs';

import { AuthService, ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';
import { FirebaseError } from 'firebase/app';

export type ComponentForm = {
  email: string;
  password: string;
};

export type ComponentFlags = {
  signup: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  #auth = inject(AuthService);
  #firestore = inject(FirestoreService);
  #router = inject(Router);
  #notification = inject(NotificationService);
  #error = inject(ErrorService);

  signup$({ email, password }: ComponentForm) {
    return this.#auth.signup$({ email, password }).pipe(
      switchMap(({ user }) => this.#firestore.saveUser$(user as User)),
      tap(user => {
        this.#notification.success({
          description: `Registered successfully as ${user?.email}.`,
          title: 'Signup Successful!'
        });
        this.#router.navigate([RoutePaths.Dashboard]);
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this.#error.getError(code);
        this.#notification.error({
          description: `${error}.`,
          title: 'Signup failed'
        });
        return of(error);
      })
    );
  }
}
