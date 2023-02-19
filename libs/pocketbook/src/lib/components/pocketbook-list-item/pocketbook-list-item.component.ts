import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { IPocketbook, POCKETBOOK_STUB } from '@expenses-tracker/shared/interfaces';
import { ExtractInitialsPipe } from '@expenses-tracker/profile';

import { PocketbookListItemService } from './pocketbook-list-item.service';
import { AddPocketbookGraphicComponent } from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, AddPocketbookGraphicComponent, ExtractInitialsPipe],
  templateUrl: './pocketbook-list-item.component.html'
})
export class PocketbookListItemComponent implements OnInit {
  #pocketBook$ = new BehaviorSubject<IPocketbook>(POCKETBOOK_STUB);
  collaboratorList$!: Observable<User[]>;
  @Input() set pocketbook(value: IPocketbook) {
    this.#pocketBook$.next(value);
  }
  get pocketbook() {
    return this.#pocketBook$.getValue();
  }

  constructor(private _service: PocketbookListItemService) {}

  ngOnInit() {
    this._service.fetchCollaboratorList$(this.pocketbook);
    this.collaboratorList$ = this._service.watchCollaboratorList$();
  }
}
