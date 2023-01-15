import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';

import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(
    private _authService: AuthService,
    private _router: Router,
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
          description: `Registered successfully as ${user?.email}.`,
          title: 'Signup Successful!'
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

  saveUser$(user: firebase.User) {
    return this._authService.saveUser$(user).pipe(
      tap(() => {
        this._notificationService.success({
          description: `User with email ${user?.email} successfully saved. Please login to continue.`,
          title: 'User Registered!'
        });
        this._router.navigate(['auth'], { queryParams: { mode: 'login' } });
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: `Unable to save the user with email: ${user?.email}`
        });
        return throwError(() => new Error(code));
      })
    );
  }
}
