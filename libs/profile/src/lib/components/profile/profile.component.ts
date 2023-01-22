import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';

import { NotificationService } from '@expenses-tracker/layout';
import { IUser } from '@expenses-tracker/shared/interfaces';

import { ExtractInitialsPipe } from '../../pipes';
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
    ProfileViewComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<IUser | null>;
  editMode = false;
  flags$!: Observable<ComponentFlags>;
  #logout$!: Subscription;

  constructor(
    private _notificationService: NotificationService,
    private _service: ProfileService
  ) {}

  ngOnInit() {
    this.user$ = this._service.getUser$();
    this.flags$ = this._service.watchFlags$();
  }

  logout() {
    this.#logout$ = this._service.logout$().subscribe();
  }

  editDetails() {
    this.editMode = !this.editMode;
  }

  saveEdits() {
    this._notificationService.success({
      title: 'Changed Saved',
      description: 'Profile details updated successfully!'
    });
    this.editMode = !this.editMode;
  }

  cancelEdits() {
    this._notificationService.info({
      title: 'Changed not saved.',
      description: 'Profile details were not updated since you clicked cancel.'
    });
    this.editMode = !this.editMode;
  }

  copyUID(uid: string | null) {
    this._service.copyUID(uid);
  }

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
  }
}
