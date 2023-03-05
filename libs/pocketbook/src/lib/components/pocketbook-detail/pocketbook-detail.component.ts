import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookDetailService } from './pocketbook-detail.service';

@Component({
  selector: 'expenses-tracker-pocketbook-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pocketbook-detail.component.html'
})
export class PocketbookDetailComponent implements OnInit {
  pocketbook$!: Observable<IPocketbook | null>;
  constructor(private _service: PocketbookDetailService) {}

  ngOnInit() {
    this.pocketbook$ = this._service.watchPocketbook$();
  }
}
