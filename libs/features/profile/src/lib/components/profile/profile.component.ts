import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import { NotificationService } from '@expenses-tracker/shared/common';

import { INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';
import { ExtractInitialsPipe } from '../../pipes';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { ComponentFlags, ProfileService } from './profile.service';

@Component({
  selector: 'expenses-tracker-profile',
  standalone: true,
  imports: [
    ClipboardModule,
    CommonModule,
    ExtractInitialsPipe,
    ProfileEditComponent,
    ProfileViewComponent,
    RouterModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  #user$!: Subscription;
  #logout$!: Subscription;

  #notification = inject(NotificationService);
  #service = inject(ProfileService);

  isEditing = signal<boolean>(false);
  flags = signal<ComponentFlags>({
    logout: INITIAL_FLAGS,
    user: INITIAL_FLAGS
  });

  user = signal<User | null>(null);

  ngOnInit() {
    this.flags.update(value => ({
      ...value,
      user: { ...value.user, loading: true }
    }));
    this.#user$ = this.#service.getUser$().subscribe({
      next: user => {
        this.flags.update(value => ({
          ...value,
          user: { ...value.user, loading: false, success: true, fail: false }
        }));
        this.user.set(user);
      },
      error: () => {
        this.flags.update(value => ({
          ...value,
          user: { ...value.user, loading: false, success: true, fail: false }
        }));
      }
    });
  }

  logout() {
    this.#logout$ = this.#service.logout$().subscribe();
  }

  editMode() {
    this.isEditing.set(true);
  }

  updateUserInfo($: User) {
    this.#service.updateUserInfo$($).subscribe({
      next: () => {
        this.#notification.success({
          title: 'Successful!',
          description: 'User details updated successfully.'
        });
        this.isEditing.set(false);
      },
      error: error => {
        this.#notification.error({
          title: 'Error!',
          description: `Unable to update the user details - ${error}.`
        });
        this.isEditing.set(true);
      }
    });
  }

  cancelEdit() {
    this.#notification.info({
      title: 'Changed not saved.',
      description: 'Profile details were not updated since you clicked cancel.'
    });
    this.isEditing.set(false);
  }

  copyUID(uid: string | null) {
    this.#service.copyUID(uid);
  }

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
    this.#user$?.unsubscribe();
  }
}
