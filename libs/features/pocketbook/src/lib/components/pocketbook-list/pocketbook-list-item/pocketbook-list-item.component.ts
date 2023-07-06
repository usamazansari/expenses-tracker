import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookListItemService } from './pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe],
  providers: [PocketbookListItemService],
  templateUrl: './pocketbook-list-item.component.html'
})
export class PocketbookListItemComponent implements OnInit {
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #isOwner$ = new BehaviorSubject<boolean>(false);
  collaboratorList$!: Observable<User[]>;
  owner$!: Observable<User | null>;

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

  #service = inject(PocketbookListItemService);

  ngOnInit() {
    this.#service.initializeComponent(this.pocketbook);
    this.collaboratorList$ = this.#service.watchCollaboratorList$();
    this.owner$ = this.#service.watchOwner$();
  }

  gotoEditPocketbook() {
    this.#service.gotoEditPocketbook(this.pocketbook as IPocketbook);
  }

  deletePocketbook() {
    const result = confirm('Delete Pocketbook?');
    const deleteStream = result
      ? this.#service.deletePocketbook$((this.pocketbook as IPocketbook)?.id ?? '')
      : EMPTY;
    deleteStream.subscribe();
  }

  gotoPocketbookDetail() {
    this.#service.gotoPocketbook(this.pocketbook?.id ?? '');
  }
}
