import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/profile';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { AddPocketbookGraphicComponent } from '@expenses-tracker/shared/assets';
import { PocketbookListItemService } from './pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    AddPocketbookGraphicComponent,
    ExtractInitialsPipe
  ],
  templateUrl: './pocketbook-list-item.component.html'
})
export class PocketbookListItemComponent implements OnInit {
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #isOwner$ = new BehaviorSubject<boolean>(false);
  collaboratorList$!: Observable<User[]>;
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

  constructor(private _service: PocketbookListItemService) {}

  ngOnInit() {
    this._service.fetchCollaboratorList$(this.pocketbook);
    this.collaboratorList$ = this._service.watchCollaboratorList$();
  }

  editPocketbook(pocketbook: IPocketbook) {
    this._service.editPocketbook(pocketbook);
  }
}
