import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { User } from 'firebase/auth';

import { ExtractInitialsPipe } from '../../pipes';
import { TooltipModule } from '../tooltip';

@Component({
  selector: 'expenses-tracker-avatar',
  standalone: true,
  imports: [CommonModule, TooltipModule, ExtractInitialsPipe],
  template: `<div
      class="p-4 border rounded-full cursor-pointer w-14 h-14 bg-color-avatar-bg border-color-border-default text-color-fg-default"
      [expensesTrackerTooltip]="userTooltip">
      {{ user() | extractInitials }}
    </div>
    <expenses-tracker-tooltip #userTooltip>
      <div class="grid gap-2 mx-4">
        <ng-container *ngIf="user()?.displayName">
          <span class="text-lg font-bold text-color-accent-fg">{{ user()?.displayName }}</span>
        </ng-container>
        <span class="font-bold">{{ user()?.email }}</span>
      </div>
    </expenses-tracker-tooltip>`,
  styles: []
})
export class AvatarComponent {
  user = signal<User | null>(null);
  @Input() set userInput(user: User | null) {
    this.user.set(user);
  }
}
