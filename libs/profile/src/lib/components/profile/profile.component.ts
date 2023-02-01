import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';

import { NotificationService } from '@expenses-tracker/shared/common';

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
    MatIconModule,
    MatRippleModule,
    ProfileEditComponent,
    ProfileViewComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<User | null>;
  isEditing = false;
  flags$!: Observable<ComponentFlags>;
  #logout$!: Subscription;

  constructor(
    private _notification: NotificationService,
    private _service: ProfileService
  ) {}

  ngOnInit() {
    this.user$ = this._service.getUser$();
    this.flags$ = this._service.watchFlags$();
  }

  logout() {
    this.#logout$ = this._service.logout$().subscribe();
  }

  editMode() {
    this.isEditing = true;
  }

  editUserInfo($: { uid: string; name: string }) {
    this._service.editUserInfo$($).subscribe({
      next: () => {
        this._notification.success({
          title: 'Successful!',
          description: 'User details updated successfully.'
        });
        this.isEditing = false;
      },
      error: error => {
        this._notification.error({
          title: 'Error!',
          description: `Unable to update the user details - ${error}.`
        });
        this.isEditing = true;
      }
    });
  }

  cancelEdit() {
    this._notification.info({
      title: 'Changed not saved.',
      description: 'Profile details were not updated since you clicked cancel.'
    });
    this.isEditing = false;
  }

  copyUID(uid: string | null) {
    this._service.copyUID(uid);
  }

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
  }
}
