import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PocketbookListItemService {
  #collaboratorList$ = new BehaviorSubject<User[]>([]);
  #owner$ = new BehaviorSubject<User | null>(null);
  #collaboratorList: User[] = [];
  #owner: User | null = null;

  constructor(
    private _router: Router,
    private _firestore: FirestoreService,
    private _context: ContextService,
    private _notification: NotificationService
  ) {}

  initializeComponent(pocketbook: IPocketbook | null) {
    this._firestore
      .watchPocketbookOwner$((pocketbook as IPocketbook)?.owner)
      .subscribe(owner => {
        this.setOwner(owner as User);
      });

    this._firestore
      .watchPocketbookCollaboratorList$((pocketbook as IPocketbook)?.collaboratorList)
      .subscribe(collaboratorList => {
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

  setOwner(owner: User | null) {
    this.#owner = owner ?? null;
    this.#owner$.next(this.#owner);
  }

  watchOwner$() {
    return this.#owner$.asObservable();
  }

  editPocketbook(pocketbook: IPocketbook) {
    this._context.setPocketbook(pocketbook);
    this._router.navigate(['pocketbook', pocketbook.id, 'edit']);
  }

  deletePocketbook$(pocketbookId: string) {
    return this._firestore.deletePocketbook$(pocketbookId).pipe(
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
