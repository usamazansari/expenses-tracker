import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { catchError, tap, throwError } from 'rxjs';

import { ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PocketbookAddService {
  constructor(
    private _router: Router,
    private _firestore: FirestoreService,
    private _error: ErrorService,
    private _notification: NotificationService
  ) {}

  addPocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._firestore.createPocketbook(pocketbook).pipe(
      tap(() => {
        this._notification.success({
          title: 'Pocketbook Created!',
          description: `Pocketbook ${pocketbook.name} successfully created!`
        });
        this._router.navigate(['pocketbook/list']);
      }),
      catchError(({ code }: FirebaseError) => {
        const error = this._error.getError(code);
        this._notification.error({
          description: `${error}.`,
          title: 'Login failed'
        });
        // this.#flags = {
        //   ...this.#flags,
        //   login: {
        //     ...this.#flags.login,
        //     loading: false,
        //     fail: true,
        //     visible: true
        //   }
        // };
        // this.#setFlags(this.#flags);
        return throwError(() => new Error(code));
      })
    );
  }

  cancelAddPocketbook() {
    this._router.navigate(['pocketbook/list']);
  }
}
