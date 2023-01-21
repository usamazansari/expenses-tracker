import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import firebase from 'firebase/compat';
import { Observable, Subscription } from 'rxjs';

import { ComponentFlags, ProfileService } from './profile.service';

@Component({
  selector: 'expenses-tracker-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<firebase.User | null>;
  flags$!: Observable<ComponentFlags>;
  #logout$!: Subscription;

  constructor(private _service: ProfileService) {}

  ngOnInit() {
    this.user$ = this._service.getUser$();
    this.flags$ = this._service.watchFlags$();
  }

  logout() {
    this.#logout$ = this._service.logout$().subscribe();
  }

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
  }
}
