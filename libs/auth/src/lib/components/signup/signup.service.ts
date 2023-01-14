import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';

import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService
  ) {}

  signup$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return this._authService.signup$({ email, password }).pipe(
      tap(({ user }) => {
        this._notificationService.success({
          description: `Registered successfully as ${user?.email}. Please login to continue.`,
          title: 'Signup Successful'
        });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: 'Signup failed'
        });
        return throwError(() => new Error(code));
      })
    );
  }
}
