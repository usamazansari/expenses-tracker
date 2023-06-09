import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { AddPocketbookGraphicComponent } from '@expenses-tracker/shared/assets';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookDetailService } from './pocketbook-detail.service';

@Component({
  selector: 'expenses-tracker-pocketbook-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    RouterModule,

    ExtractInitialsPipe,
    AddPocketbookGraphicComponent
  ],
  templateUrl: './pocketbook-detail.component.html'
})
export class PocketbookDetailComponent implements OnInit {
  pocketbook$!: Observable<IPocketbook | null>;
  collaboratorList$!: Observable<User[]>;
  owner$!: Observable<User | null>;

  #service = inject(PocketbookDetailService);

  ngOnInit() {
    this.#service.initializeComponent();
    this.pocketbook$ = this.#service.watchPocketbook$();
    this.collaboratorList$ = this.#service.watchCollaboratorList$();
    this.owner$ = this.#service.watchOwner$();

    this.pocketbook$.subscribe(pb => {
      console.log({ pb });
    });
  }
}
