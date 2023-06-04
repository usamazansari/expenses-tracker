import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EmptyPocketbookListGraphicComponent } from '@expenses-tracker/shared/assets';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookListItemComponent } from '../pocketbook-list-item/pocketbook-list-item.component';
import { PocketbookOwnerListService } from './pocketbook-owner-list.service';

@Component({
  selector: 'expenses-tracker-pocketbook-owner-list',
  standalone: true,
  imports: [CommonModule, EmptyPocketbookListGraphicComponent, PocketbookListItemComponent],
  templateUrl: './pocketbook-owner-list.component.html',
  styles: []
})
export class PocketbookOwnerListComponent implements OnInit {
  pocketbookList$!: Observable<IPocketbook[]>;

  constructor(private _service: PocketbookOwnerListService) {}

  ngOnInit() {
    this._service.fetchPocketbookList$();
    this.pocketbookList$ = this._service.watchPocketbookList$();
  }
}
