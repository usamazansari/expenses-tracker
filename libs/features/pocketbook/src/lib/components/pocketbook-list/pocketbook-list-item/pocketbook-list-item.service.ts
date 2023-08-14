import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { catchError, tap, throwError } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';
import { NotificationService, RoutePaths } from '@expenses-tracker/shared/common';
import { IFlag, IPocketbook } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  owner: IFlag;
  collaboratorList: IFlag;
  deletePocketbook: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class PocketbookListItemService {
  #router = inject(Router);
  #firestore = inject(FirestoreService);
  #context = inject(ContextService);
  #notification = inject(NotificationService);
  owner = signal<User | null>(null);
  collaboratorList = signal<User[]>([]);

  initializeComponent(pocketbook: IPocketbook | null) {
    this.#firestore.watchPocketbookOwner$((pocketbook as IPocketbook)?.owner).subscribe(owner => {
      this.owner.set(owner as User);
    });

    this.#firestore
      .watchPocketbookCollaboratorList$((pocketbook as IPocketbook)?.collaboratorList)
      .subscribe(collaboratorList => {
        this.collaboratorList.set(collaboratorList as User[]);
      });
  }

  gotoEditPocketbook(pocketbook: IPocketbook) {
    this.#context.setPocketbook(pocketbook);
    this.#router.navigate([RoutePaths.Pocketbook, pocketbook.id, RoutePaths.EntityEdit]);
  }

  gotoPocketbook(id: string) {
    this.#router.navigate([RoutePaths.Pocketbook, id]);
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
