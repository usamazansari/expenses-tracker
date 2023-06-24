import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { RoutePaths } from '@expenses-tracker/shared/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  #auth = inject(AngularFireAuth);
  #router = inject(Router);

  canActivate() {
    return this.#auth.user.pipe(
      map(user => {
        if (!!user) {
          return true;
        } else {
          this.#router.navigate([RoutePaths.Auth, RoutePaths.AuthLogin]);
          return false;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard {
  #auth = inject(AngularFireAuth);
  #router = inject(Router);

  canActivate() {
    return this.#auth.user.pipe(
      map(user => {
        if (!user) {
          return true;
        } else {
          this.#router.navigate([RoutePaths.Dashboard]);
          return false;
        }
      })
    );
  }
}
