import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PocketbookListService, PocketbookViewMode } from './pocketbook-list.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pocketbook-list.component.html',
  styles: []
})
export class PocketbookListComponent implements OnInit {
  viewMode$!: Observable<PocketbookViewMode>;

  constructor(private _service: PocketbookListService) {}

  ngOnInit() {
    this._service.fetchViewMode();
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
