import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

import { ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  addPocketbook: IFlag;
  fetchCollaborators: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class PocketbookAddService {
  #userList$ = new BehaviorSubject<User[]>([]);
  #flags$ = new BehaviorSubject<ComponentFlags>({
    addPocketbook: INITIAL_FLAGS,
    fetchCollaborators: INITIAL_FLAGS
  });
  #userList: User[] = [];
  #flags: ComponentFlags = {
    addPocketbook: INITIAL_FLAGS,
    fetchCollaborators: INITIAL_FLAGS
  };

  constructor(
    private _router: Router,
    private _firestore: FirestoreService,
    private _error: ErrorService,
    private _notification: NotificationService
  ) {}

  fetchUserList$() {
    this.resetFlags();
    this.#setFlags({
      ...this.#flags,
      fetchCollaborators: {
        ...this.#flags.fetchCollaborators,
        loading: true
      }
    });
    this._firestore.watchUserList$().subscribe(userList => {
      this.#setFlags({
        ...this.#flags,
        fetchCollaborators: {
          ...this.#flags.fetchCollaborators,
          loading: false,
          success: true
        }
      });
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

  #setFlags(flags: ComponentFlags) {
    this.#flags = { ...flags } ?? {
      addPocketbook: INITIAL_FLAGS,
      fetchCollaborators: INITIAL_FLAGS
    };
    this.#flags$.next(this.#flags);
  }

  resetFlags() {
    this.#setFlags({
      addPocketbook: INITIAL_FLAGS,
      fetchCollaborators: INITIAL_FLAGS
    });
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  addPocketbook$(pocketbook: IPocketbook) {
    this.resetFlags();
    this.#setFlags({
      ...this.#flags,
      addPocketbook: {
        ...this.#flags.addPocketbook,
        loading: true
      }
    });
    return this._firestore.createPocketbook$(pocketbook).pipe(
      tap(() => {
        this._notification.success({
          title: 'Pocketbook Created!',
          description: `Pocketbook ${pocketbook.name} successfully created!`
        });
        this.resetFlags();
        this._router.navigate(['pocketbook/list']);
      }),
      catchError(error => {
        this._notification.error({
          description: `${error}.`,
          title: 'Pocketbook Add'
        });
        this.#setFlags({
          ...this.#flags,
          addPocketbook: {
            ...this.#flags.addPocketbook,
            loading: false,
            fail: true,
            visible: true
          }
        });
        return of(error);
      })
    );
  }

  cancelAddPocketbook() {
    this._router.navigate(['pocketbook/list']);
  }
}
