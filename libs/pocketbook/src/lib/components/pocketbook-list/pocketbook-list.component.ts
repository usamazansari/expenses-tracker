import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import {
  EmptyPocketbookListGraphicComponent,
  PocketbookGraphicComponent
} from '@expenses-tracker/shared/assets';

import { PocketbookListItemComponent } from '../pocketbook-list-item/pocketbook-list-item.component';
import { PocketbookListService, PocketbookViewMode } from './pocketbook-list.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,

    EmptyPocketbookListGraphicComponent,
    PocketbookGraphicComponent,
    PocketbookListItemComponent
  ],
  templateUrl: './pocketbook-list.component.html',
  styles: []
})
export class PocketbookListComponent implements OnInit {
  viewMode$!: Observable<PocketbookViewMode>;

  constructor(private _service: PocketbookListService) {}

  ngOnInit() {
    this.viewMode$ = this._service.watchViewMode$();
  }

  addPocketbook() {
    this._service.gotoAddPocketbook();
  }

  gotoOwnerPocketbookList() {
    this._service.gotoOwnerPocketbookList();
  }

  gotoCollaboratorPocketbookList() {
    this._service.gotoCollaboratorPocketbookList();
  }
}
