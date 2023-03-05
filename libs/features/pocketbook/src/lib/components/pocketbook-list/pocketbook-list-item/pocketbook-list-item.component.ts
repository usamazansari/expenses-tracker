import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from 'firebase/auth';
import { of, EMPTY, BehaviorSubject, Observable, switchMap } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { AddPocketbookGraphicComponent } from '@expenses-tracker/shared/assets';

import { PocketbookListItemService } from './pocketbook-list-item.service';
import { PocketbookDeleteDialogComponent } from './pocketbook-delete-dialog.component';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    AddPocketbookGraphicComponent,
    ExtractInitialsPipe
  ],
  providers: [PocketbookListItemService],
  templateUrl: './pocketbook-list-item.component.html'
})
export class PocketbookListItemComponent implements OnInit {
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #isOwner$ = new BehaviorSubject<boolean>(false);
  collaboratorList$!: Observable<User[]>;
  owner$!: Observable<User | null>;

  @Input() set pocketbook(value: IPocketbook | null) {
    this.#pocketbook$.next(value);
  }
  get pocketbook() {
    return this.#pocketbook$.getValue();
  }

  @Input() set isOwner(value: boolean) {
    this.#isOwner$.next(value);
  }
  get isOwner() {
    return this.#isOwner$.getValue();
  }

  constructor(private _service: PocketbookListItemService, private _dialog: MatDialog) {}

  ngOnInit() {
    this._service.fetchCollaboratorList$(this.pocketbook);
    this.collaboratorList$ = this._service.watchCollaboratorList$();
    this.owner$ = this._service.watchOwner$(this.pocketbook) as Observable<User>;
  }

  editPocketbook() {
    this._service.editPocketbook(this.pocketbook as IPocketbook);
  }

  deletePocketbook() {
    const _ref = this._dialog.open(PocketbookDeleteDialogComponent);

    _ref
      .afterClosed()
      .pipe(
        switchMap(result =>
          result ? this._service.deletePocketbook$(this.pocketbook as IPocketbook) : of(EMPTY)
        )
      )
      .subscribe();
  }

  gotoPocketbookDetail() {
    this._service.gotoPocketbook(this.pocketbook?.id ?? '');
  }
}
