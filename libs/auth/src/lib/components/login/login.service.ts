import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { UserInfo } from 'firebase/auth';
import { catchError, tap, throwError } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';

import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {}

  login$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return this._authService.login$({ email, password }).pipe(
      tap(({ user }) => {
        this.updateState();
        this.updateUser(user);
        this._notificationService.success({
          description: `Logged in successfully as ${
            user?.displayName ?? user?.email
          }.`,
          title: 'Login Successful'
        });
        this._router.navigate(['dashboard']);
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._authService.getError(code);
        this._notificationService.error({
          description: `${error}.`,
          title: 'Login failed'
        });
        return throwError(() => new Error(code));
      })
    );
  }

  updateState() {
    this._authService.setIsLoggedIn(true);
  }

  updateUser(user: UserInfo | null) {
    this._authService.setUser(user);
  }
}
