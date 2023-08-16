import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, computed, inject } from '@angular/core';

import { ExtractInitialsPipe } from '@expenses-tracker/features/profile';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { PocketbookListItemService } from './pocketbook-list-item.service';

@Component({
  selector: 'expenses-tracker-pocketbook-contributors-dialog',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe],
  template: `
    <div class="et-card grid gap-2 w-96 bg-color-codemirror-gutters-bg">
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-color-accent-fg hover:underline cursor-pointer" (click)="gotoPocketbook()">
          {{ pocketbook.name }}
        </span>
        <span class="material-icons text-color-fg-muted cursor-pointer" (click)="closeDialog()">clear</span>
      </div>
      <ng-container *ngIf="flags().owner.loading || flags().collaboratorList.loading">
        <div class="grid place-content-center">
          <div class="flex items-center gap-2 cursor-default">
            <span class="material-icons animate-spin">autorenew</span>
            <span class="font-bold">Loading</span>
          </div>
        </div>
      </ng-container>
      <div class="grid gap-2">
        <ng-container *ngIf="flags().owner.success">
          <div class="grid grid-cols-2 items-center gap-2">
            <span class="font-bold">Owned by</span>
            <div class="flex items-center">
              <div
                class="p-4 border rounded-full w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default">
                {{ owner() | extractInitials }}
              </div>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="flags().owner.fail">
          <div class="grid  place-content-center">
            <div class="flex items-center gap-2 cursor-default">
              <span class="material-icons text-color-danger-fg">error</span>
              <span class="font-bold text-color-danger-fg">Failed to load owner information</span>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="flags().collaboratorList.success">
          <div class="grid grid-cols-2 items-center gap-2">
            <span class="font-bold">Collaborators</span>
            <div class="flex items-center">
              <ng-container *ngFor="let collaborator of collaboratorList(); trackBy: collaboratorListTrack">
                <div
                  class="p-4 border rounded-full w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default">
                  {{ collaborator | extractInitials }}
                </div>
              </ng-container>
            </div>
          </div>
        </ng-container>
        <ng-container *ngIf="flags().collaboratorList.fail">
          <div class="grid  place-content-center">
            <div class="flex items-center gap-2 cursor-default">
              <span class="material-icons text-color-danger-fg">error</span>
              <span class="font-bold text-color-danger-fg">Failed to load collaborators information</span>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class PocketbookContributorsDialogComponent implements OnInit, OnDestroy {
  #service = inject(PocketbookListItemService);
  #dialogRef = inject(DialogRef);
  owner = computed(() => this.#service.owner());
  collaboratorList = computed(() => this.#service.collaboratorList());
  flags = computed(() => this.#service.flags());
  #pocketbookOwner$!: Subscription;
  #pocketbookCollaboratorList$!: Subscription;

  constructor(@Inject(DIALOG_DATA) public pocketbook: IPocketbook) {}

  ngOnInit(): void {
    this.#pocketbookOwner$ = this.#service.watchPocketbookOwner$(this.pocketbook.owner).subscribe();
    this.#pocketbookCollaboratorList$ = this.#service
      .watchPocketbookCollaboratorList$(this.pocketbook.collaboratorList)
      .subscribe();
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
    this.#pocketbookOwner$?.unsubscribe();
    this.#pocketbookCollaboratorList$?.unsubscribe();
  }
}
