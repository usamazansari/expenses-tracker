import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { EmptyPocketbookListGraphicComponent } from '@expenses-tracker/shared/assets';

import { PocketbookListService } from './pocketbook-list.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, EmptyPocketbookListGraphicComponent],
  templateUrl: './pocketbook-list.component.html',
  styles: []
})
export class PocketbookListComponent implements OnInit {
  pocketbookList$!: Observable<IPocketbook[]>;
  constructor(private _service: PocketbookListService) {}

  ngOnInit() {
    this._service.fetchPocketbookList$();
    this.pocketbookList$ = this._service.watchPocketbookList$();
  }

  addPocketbook() {
    this._service.gotoAddPocketbook();
  }
}
