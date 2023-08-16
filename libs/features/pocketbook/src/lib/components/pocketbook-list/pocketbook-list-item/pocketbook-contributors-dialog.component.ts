import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookListItemService } from './pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-contributors-dialog',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe],
  template: `
    <ng-container *ngIf="pocketbook">
      <div class="et-card grid gap-2 w-96 bg-color-codemirror-gutters-bg">
        <div class="flex items-center justify-between">
          <span
            class="text-xl font-bold text-color-accent-fg hover:underline cursor-pointer"
            (click)="gotoPocketbook()">
            {{ pocketbook.name }}
          </span>
          <span class="material-icons text-color-fg-muted cursor-pointer" (click)="closeDialog()">clear</span>
        </div>
        <ng-container *ngIf="flags().contributorsFetch.loading">
          <div class="grid place-content-center">
            <div class="flex items-center gap-2 cursor-default">
              <span class="material-icons animate-spin">autorenew</span>
              <span class="font-bold">Loading</span>
            </div>
          </div>
        </ng-container>
        <div class="grid gap-2">
          <ng-container *ngIf="flags().contributorsFetch.success">
            <div class="grid grid-cols-2 items-center gap-2">
              <span class="font-bold text-right">Owned by</span>
              <div class="flex items-center">
                <div
                  class="p-4 border rounded-full w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default">
                  {{ owner() | extractInitials }}
                </div>
              </div>
            </div>
            <ng-container *ngIf="collaboratorList().length === 0; else showCollaborators">
              <div class="flex items-center justify-center gap-2 cursor-default">
                <span class="material-icons text-color-accent-fg">error</span>
                <span class="text-color-accent-fg">No collaborators in this pocketbook</span>
              </div>
            </ng-container>
            <ng-template #showCollaborators>
              <div class="grid grid-cols-2 items-center gap-2">
                <span class="font-bold text-right">Collaborators</span>
                <div class="flex gap-1 items-center">
                  <ng-container *ngFor="let collaborator of collaboratorList(); trackBy: collaboratorListTrack">
                    <div
                      class="p-4 border rounded-full w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default">
                      {{ collaborator | extractInitials }}
                    </div>
                  </ng-container>
                </div>
              </div>
            </ng-template>
          </ng-container>
          <ng-container *ngIf="flags().contributorsFetch.fail">
            <div class="grid  place-content-center">
              <div class="flex items-center gap-2 cursor-default">
                <span class="material-icons text-color-danger-fg">error</span>
                <span class="font-bold text-color-danger-fg">Failed to load owner information</span>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </ng-container>
  `
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
    this.#service.gotoPocketbook(this.pocketbook.id);
  }

  closeDialog() {
    this.#dialogRef.close();
  }

  ngOnDestroy() {
    this.#pocketbookContributors$?.unsubscribe();
  }
}
