import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  editPocketbook: IFlag;
  fetchCollaborators: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class PocketbookEditService {
  #userList$ = new BehaviorSubject<User[]>([]);
  #flags$ = new BehaviorSubject<ComponentFlags>({
    editPocketbook: INITIAL_FLAGS,
    fetchCollaborators: INITIAL_FLAGS
  });
  #userList: User[] = [];
  #flags: ComponentFlags = {
    editPocketbook: INITIAL_FLAGS,
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
      editPocketbook: INITIAL_FLAGS,
      fetchCollaborators: INITIAL_FLAGS
    });
  }

  watchFlags$() {
    return this.#flags$.asObservable();
  }

  editPocketbook$(pocketbook: Partial<IPocketbook>) {
    this.resetFlags();
    this.#setFlags({
      ...this.#flags,
      editPocketbook: {
        ...this.#flags.editPocketbook,
        loading: true
      }
    });
    return this._firestore.updatePocketbook$(pocketbook).pipe(
      tap(() => {
        this._notification.success({
          title: 'Pocketbook Updated!',
          description: `Pocketbook ${pocketbook.name} successfully created!`
        });
        this.resetFlags();
        this._router.navigate(['pocketbook/list']);
      }),
      catchError((e: FirebaseError) => {
        console.error({ e });
        const { code } = e;
        const error = this._error.getError(code);
        this._notification.error({
          description: `${error}.`,
          title: 'Pocketbook not updated'
        });
        this.#setFlags({
          ...this.#flags,
          editPocketbook: {
            ...this.#flags.editPocketbook,
            loading: false,
            fail: true,
            visible: true
          }
        });
        return throwError(() => new Error(code));
      })
    );
  }

  cancelEditPocketbook(pocketbook: string = '') {
    if (!pocketbook) this._router.navigate(['pocketbook/list']);
    else this._router.navigate([`pocketbook/${pocketbook}`]);
  }
}
