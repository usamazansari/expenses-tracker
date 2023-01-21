import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '@expenses-tracker/layout';
import firebase from 'firebase/compat';
import { Observable, Subscription } from 'rxjs';

import { ComponentFlags, ProfileService } from './profile.service';

@Component({
  selector: 'expenses-tracker-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<firebase.User | null>;
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

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
  }
}
