import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { ContextService, FirestoreService } from '@expenses-tracker/core';

@Injectable({
  providedIn: 'root'
})
export class PocketbookDetailService {
  constructor(
    private _router: Router,
    private _context: ContextService,
    private _firestore: FirestoreService
  ) {}

  watchPocketbook$() {
    return this._context
      .watchPocketbook$()
      .pipe(
        switchMap(pb =>
          !pb
            ? this._firestore.watchPocketbook$(this._router.url.split('/').at(-1) ?? '')
            : of(pb)
        )
      );
  }
}
