import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import { AvatarComponent, ExtractInitialsPipe } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { TooltipModule } from '@expenses-tracker/shared/common';

import { PocketbookListItemService } from '../pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-contributors-dialog',
  standalone: true,
  imports: [AvatarComponent, CommonModule, ExtractInitialsPipe, TooltipModule],
  templateUrl: './pocketbook-contributors-dialog.component.html'
})
export class PocketbookContributorsDialogComponent implements OnInit, OnDestroy {
  #service = inject(PocketbookListItemService);
  #dialogRef = inject(DialogRef);
  owner = computed(() => this.#service.owner());
  collaboratorList = computed(() => this.#service.collaboratorList());
  flags = computed(() => this.#service.flags());
  #pocketbookContributors$!: Subscription;

  constructor(@Inject(DIALOG_DATA) public pocketbook: IPocketbook) {}

  ngOnInit(): void {
    this.#service.resetPocketbookContributors();
    this.#service.resetFlags();
    this.#pocketbookContributors$ = this.#service.watchContributors$(this.pocketbook).subscribe();
  }

  collaboratorListTrack(index: number, user: User) {
    return user.uid;
  }

  gotoPocketbook() {
    this.#service.gotoPocketbook(this.pocketbook);
  }

  closeDialog() {
    this.#dialogRef.close();
  }

  ngOnDestroy() {
    this.#pocketbookContributors$?.unsubscribe();
  }
}
