import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EmptyPocketbookListGraphicComponent } from '@expenses-tracker/shared/assets';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookListItemComponent } from '../pocketbook-list-item/pocketbook-list-item.component';
import { PocketbookCollaboratorListService } from './pocketbook-collaborator-list.service';

@Component({
  selector: 'expenses-tracker-pocketbook-collaborator-list',
  standalone: true,
  imports: [CommonModule, EmptyPocketbookListGraphicComponent, PocketbookListItemComponent],
  templateUrl: './pocketbook-collaborator-list.component.html',
  styles: []
})
export class PocketbookCollaboratorListComponent implements OnInit {
  pocketbookList$!: Observable<IPocketbook[]>;

  constructor(private _service: PocketbookCollaboratorListService) {}

  ngOnInit() {
    this._service.fetchPocketbookList$();
    this.pocketbookList$ = this._service.watchPocketbookList$();
  }
}
