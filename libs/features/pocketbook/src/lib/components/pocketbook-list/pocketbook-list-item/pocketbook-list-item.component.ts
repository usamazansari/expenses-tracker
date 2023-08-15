import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { User } from 'firebase/auth';
import { EMPTY } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { TooltipModule } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookDeleteDialogComponent } from './pocketbook-delete-dialog.component';
import { PocketbookListItemService } from './pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe, TooltipModule, DialogModule],
  providers: [PocketbookListItemService],
  templateUrl: './pocketbook-list-item.component.html'
})
export class PocketbookListItemComponent implements OnInit {
  pocketbook = signal<IPocketbook | null>(null);
  isOwner = signal(false);
  collaboratorList = signal<User[]>([]);
  owner = signal<User | null>(null);

  @Input() set pocketbookInput(value: IPocketbook | null) {
    this.pocketbook.set(value);
  }

  @Input() set isOwnerInput(value: boolean) {
    this.isOwner.set(value);
  }

  #service = inject(PocketbookListItemService);
  #dialog = inject(Dialog);

  ngOnInit() {
    if (this.pocketbook()) this.#service.initializeComponent(this.pocketbook());
  }

  gotoEditPocketbook() {
    this.#service.gotoEditPocketbook(this.pocketbook() as IPocketbook);
  }

  showMenu() {
    throw new Error('Method not implemented.');
  }

  showContributors() {
    const dialogRef = this.#dialog.open(PocketbookDeleteDialogComponent);
    dialogRef.closed.subscribe(data => {
      console.log({ data });
    });
  }

  deletePocketbook() {
    const result = confirm('Delete Pocketbook?');
    const deleteStream = result ? this.#service.deletePocketbook$((this.pocketbook() as IPocketbook)?.id ?? '') : EMPTY;
    deleteStream.subscribe();
  }

  gotoPocketbookDetail() {
    this.#service.gotoPocketbook(this.pocketbook()?.id ?? '');
  }
}
