import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { NotificationService } from '@expenses-tracker/shared/common';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListItemService {
  #collaboratorList$ = new BehaviorSubject<User[]>([]);
  #collaboratorList: User[] = [];

  constructor(
    private _router: Router,
    private _firestore: FirestoreService,
    private _context: ContextService,
    private _notification: NotificationService
  ) {}

  fetchCollaboratorList$(pocketbook: IPocketbook | null) {
    this._firestore.watchCollaboratorList$(pocketbook).subscribe(collaboratorList => {
      this.setCollaboratorList(collaboratorList as User[]);
    });
  }

  setCollaboratorList(collaboratorList: User[]) {
    this.#collaboratorList = collaboratorList ?? [];
    this.#collaboratorList$.next(this.#collaboratorList);
  }

  watchCollaboratorList$() {
    return this.#collaboratorList$.asObservable();
  }

  watchOwner$(pocketbook: IPocketbook | null) {
    return this._firestore.watchOwner$(pocketbook);
  }

  editPocketbook(pocketbook: IPocketbook) {
    this._context.setPocketbook(pocketbook);
    this._router.navigate(['pocketbook/edit']);
  }

  deletePocketbook$(pocketbook: IPocketbook) {
    return this._firestore.deletePocketbook$(pocketbook).pipe(
      tap(() => {
        this._notification.success({
          title: 'Deleted Successfully',
          description: 'Pocketbook successfully deleted'
        });
      }),
      catchError(e => {
        this._notification.error({
          title: 'Delete Failed',
          description: 'Unable to delete the pocketbook'
        });
        return throwError(() => new Error(e));
      })
    );
  }

  gotoPocketbook(id: string) {
    this._router.navigate(['pocketbook', id]);
  }
}
