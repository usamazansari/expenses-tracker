import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, inject, signal } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/shared/common';
import { TooltipModule } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookContributorsDialogComponent } from './pocketbook-contributors-dialog/pocketbook-contributors-dialog.component';
import { PocketbookListItemService } from './pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe, TooltipModule, DialogModule],
  providers: [PocketbookListItemService],
  templateUrl: './pocketbook-list-item.component.html'
})
export class PocketbookListItemComponent implements OnDestroy {
  pocketbook = signal<IPocketbook | null>(null);
  isOwner = signal(false);
  collaboratorList = signal<User[]>([]);
  owner = signal<User | null>(null);
  #deleteSubscription$!: Subscription;
  #deleteDialogSubscription$!: Subscription;
  #contributorsDialogSubscription$!: Subscription;

  @Input() set pocketbookInput(value: IPocketbook | null) {
    this.pocketbook.set(value);
  }

  @Input() set isOwnerInput(value: boolean) {
    this.isOwner.set(value);
  }

  #service = inject(PocketbookListItemService);
  #dialog = inject(Dialog);

  gotoEditPocketbook() {
    this.#service.gotoEditPocketbook(this.pocketbook() as IPocketbook);
  }

  showContributors() {
    const dialogRef = this.#dialog.open(PocketbookContributorsDialogComponent, {
      data: this.pocketbook(),
      disableClose: true,
      backdropClass: ['bg-color-primer-canvas-backdrop', 'backdrop-blur-[2px]']
    });
    this.#contributorsDialogSubscription$ = dialogRef.closed.subscribe();
  }

  gotoPocketbookDetail() {
    this.#service.gotoPocketbook(this.pocketbook() as IPocketbook);
  }

  ngOnDestroy() {
    this.#deleteSubscription$?.unsubscribe();
    this.#deleteDialogSubscription$?.unsubscribe();
    this.#contributorsDialogSubscription$?.unsubscribe();
  }
}
