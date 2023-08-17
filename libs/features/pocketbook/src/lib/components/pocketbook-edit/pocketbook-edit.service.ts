import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';

import { ContextService, ErrorService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, INITIAL_FLAGS, IPocketbook } from '@expenses-tracker/shared/interfaces';

export interface IPocketbookEditForm {
  name: string | null;
  collaboratorList: User[] | null;
}

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

  #router = inject(Router);
  #context = inject(ContextService);
  #firestore = inject(FirestoreService);
  #error = inject(ErrorService);
  #notification = inject(NotificationService);

  fetchUserList$() {
    this.resetFlags();
    this.#setFlags({
      ...this.#flags,
      fetchCollaborators: {
        ...this.#flags.fetchCollaborators,
        loading: true
      }
    });
    this.#firestore.watchUserList$().subscribe(userList => {
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

  watchPocketbook$() {
    // const pocketbookId = this.#router.url.match(/pocketbook\/(\w+)\//)?.at(1);
    // return this.#context
    //   .watchPocketbook$()
    //   .pipe(switchMap(pb => (!pb ? this.#firestore.watchPocketbook$(pocketbookId ?? '') : of(pb))));
  }

  // patchValues$(): Observable<IPocketbookEditForm> {
  // return this.watchUserList$().pipe(
  //   switchMap(userList =>
  //     this.watchPocketbook$().pipe(
  //       map(pb => ({
  //         name: pb?.name ?? '',
  //         collaboratorList: userList.filter(({ uid }) => pb?.collaboratorList.includes(uid))
  //       }))
  //     )
  //   )
  // );
  // }

  editPocketbook$(pocketbook: Partial<IPocketbook>) {
    // this.resetFlags();
    // this.#setFlags({
    //   ...this.#flags,
    //   editPocketbook: {
    //     ...this.#flags.editPocketbook,
    //     loading: true
    //   }
    // });
    // return this.#firestore.updatePocketbook$({ ...this.#context.getPocketbook(), ...pocketbook }).pipe(
    //   tap(() => {
    //     this.#notification.success({
    //       title: 'Pocketbook Updated!',
    //       description: `Pocketbook ${pocketbook.name} successfully updated!`
    //     });
    //     this.resetFlags();
    //     this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityList]);
    //   }),
    //   catchError(error => {
    //     this.#notification.error({
    //       description: `${error}.`,
    //       title: 'Pocketbook not updated'
    //     });
    //     this.#setFlags({
    //       ...this.#flags,
    //       editPocketbook: {
    //         ...this.#flags.editPocketbook,
    //         loading: false,
    //         fail: true,
    //         visible: true
    //       }
    //     });
    //     return throwError(() => new Error(error));
    //   })
    // );
  }

  cancelEditPocketbook(pocketbook = '') {
    if (!pocketbook) this.#router.navigate([RoutePaths.Pocketbook, RoutePaths.EntityList]);
    else this.#router.navigate([RoutePaths.Pocketbook, pocketbook]);
  }
}
