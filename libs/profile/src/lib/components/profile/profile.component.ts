import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';
import { IUser } from '@expenses-tracker/shared/interfaces';

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
  user$!: Observable<IUser | null>;
  isEditing = false;
  flags$!: Observable<ComponentFlags>;
  #logout$!: Subscription;

  constructor(
    private _notificationService: NotificationService,
    private _service: ProfileService
  ) {}

  ngOnInit() {
    this.user$ = this._service.getUser$() as Observable<IUser | null>;
    this.flags$ = this._service.watchFlags$();
  }

  logout() {
    this.#logout$ = this._service.logout$().subscribe();
  }

  editMode() {
    this.isEditing = true;
  }

  editUserInfo($: { name: string | null }) {
    this._service.updateUserDetails$($).subscribe({
      next: () => {
        this._notificationService.success({
          title: 'Successful!',
          description: 'User details updated successfully.'
        });
        this.isEditing = false;
      },
      error: error => {
        this._notificationService.error({
          title: 'Failed!',
          description: `Unable to update the user details - ${error}.`
        });
        this.isEditing = true;
      }
    });
  }

  cancelEdit() {
    this._notificationService.info({
      title: 'Changed not saved.',
      description: 'Profile details were not updated since you clicked cancel.'
    });
    this.isEditing = !this.isEditing;
  }

  copyUID(uid: string | null) {
    this._service.copyUID(uid);
  }

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
  }
}
