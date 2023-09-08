import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { User } from 'firebase/auth';

import { ExtractInitialsPipe } from '../../pipes';
import { TooltipModule } from '../tooltip';

@Component({
  selector: 'expenses-tracker-avatar',
  standalone: true,
  imports: [CommonModule, TooltipModule, ExtractInitialsPipe],
  template: `<ng-container *ngIf="userList()?.length === 0; else showAvatarList">
      <div
        class="grid p-4 border rounded-full cursor-pointer w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default place-content-center"
        [expensesTrackerTooltip]="noCollaboratorTooltip">
        <span class="material-icons text-color-accent-fg">clear</span>
      </div>
      <expenses-tracker-tooltip #noCollaboratorTooltip>
        <div class="px-2 cursor-default">
          <span class="whitespace-nowrap">No collaborators in this pocketbook</span>
        </div>
      </expenses-tracker-tooltip>
    </ng-container>
    <ng-template #showAvatarList>
      <ng-container *ngFor="let user of userList(); trackBy: userListTrack">
        <div
          class="p-4 border rounded-full cursor-pointer w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default"
          [expensesTrackerTooltip]="userTooltip">
          {{ user | extractInitials }}
        </div>
        <expenses-tracker-tooltip #userTooltip>
          <div class="grid gap-2 mx-4">
            <ng-container *ngIf="user?.displayName">
              <span class="text-lg font-bold text-color-accent-fg">{{ user?.displayName }}</span>
            </ng-container>
            <span class="font-bold">{{ user?.email }}</span>
          </div>
        </expenses-tracker-tooltip>
      </ng-container>
    </ng-template> `,
  styles: []
})
export class AvatarComponent {
  userList = signal<User[]>([]);
  @Input() set userListInput(user: User[]) {
    this.userList.set(user);
  }

  userListTrack(index: number, user: User) {
    return user.uid;
  }
}
