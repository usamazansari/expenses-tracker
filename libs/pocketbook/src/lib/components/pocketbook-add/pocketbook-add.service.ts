import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { AuthService, ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookAddService {
  #userList$ = new BehaviorSubject<User[]>([]);
  #userList: User[] = [];
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _firestore: FirestoreService,
    private _error: ErrorService,
    private _notification: NotificationService
  ) {}

  fetchUserList$() {
    this._firestore.watchUserList$().subscribe(userList => {
      this.#setUserList(userList as User[]);
    });
  }

  #setUserList(userList: User[] = []) {
    this.#userList = userList ?? [];
    this.#userList$.next(userList);
  }

  getUserList() {
    return this.#userList;
  }

  watchUserList$() {
    return this.#userList$.asObservable();
  }

  addPocketbook$(pocketbook: Partial<IPocketbook>) {
    return this._firestore.createPocketbook$(pocketbook).pipe(
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
