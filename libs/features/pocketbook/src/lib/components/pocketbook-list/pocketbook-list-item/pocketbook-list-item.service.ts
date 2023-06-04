import { Injectable, inject } from '@angular/core';
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
  #router = inject(Router);
  #firestore = inject(FirestoreService);
  #context = inject(ContextService);
  #notification = inject(NotificationService);

  initializeComponent(pocketbook: IPocketbook | null) {
    this.#firestore
      .watchPocketbookOwner$((pocketbook as IPocketbook)?.owner)
      .subscribe(owner => {
        this.setOwner(owner as User);
      });

    this.#firestore
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

  gotoEditPocketbook(pocketbook: IPocketbook) {
    this.#context.setPocketbook(pocketbook);
    this.#router.navigate(['pocketbook', pocketbook.id, 'edit']);
  }

  gotoPocketbook(id: string) {
    this.#router.navigate(['pocketbook', id]);
  }

  deletePocketbook$(pocketbookId: string) {
    return this.#firestore.deletePocketbook$(pocketbookId).pipe(
      tap(() => {
        this.#notification.success({
          title: 'Deleted Successfully',
          description: 'Pocketbook successfully deleted'
        });
        this.#context.setPocketbook(null);
      }),
      catchError(e => {
        this.#notification.error({
          title: 'Delete Failed',
          description: 'Unable to delete the pocketbook'
        });
        return throwError(() => new Error(e));
      })
    );
  }
}
