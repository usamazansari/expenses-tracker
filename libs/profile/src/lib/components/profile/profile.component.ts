import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

import { ProfileService } from './profile.service';

@Component({
  selector: 'expenses-tracker-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user$!: Observable<firebase.User | null>;

  constructor(private _service: ProfileService) {}

  ngOnInit() {
    this.user$ = this._service.getUser$();
  }
}
