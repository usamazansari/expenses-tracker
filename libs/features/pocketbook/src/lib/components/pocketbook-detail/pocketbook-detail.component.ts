import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookDetailService } from './pocketbook-detail.service';

@Component({
  selector: 'expenses-tracker-pocketbook-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ExtractInitialsPipe],
  templateUrl: './pocketbook-detail.component.html'
})
export class PocketbookDetailComponent implements OnInit {
  pocketbook$!: Observable<IPocketbook | null>;
  collaboratorList$!: Observable<User[]>;
  owner$!: Observable<User | null>;
  constructor(private _service: PocketbookDetailService) {}

  ngOnInit() {
    this._service.initializeComponent();
    this.pocketbook$ = this._service.watchPocketbook$();
    this.collaboratorList$ = this._service.watchCollaboratorList$();
    this.owner$ = this._service.watchOwner$();
  }
}
