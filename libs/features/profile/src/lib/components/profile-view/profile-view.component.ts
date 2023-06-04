import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { ExtractInitialsPipe } from '../../pipes';

@Component({
  selector: 'expenses-tracker-profile-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule, ExtractInitialsPipe],
  templateUrl: './profile-view.component.html'
})
export class ProfileViewComponent {
  #user$ = new BehaviorSubject<User | null>(null);
  @Input()
  set user(value: User | null) {
    this.#user$.next(value);
  }
  get user() {
    return this.#user$.getValue();
  }
  @Output() copyUID$ = new EventEmitter<string | null>();
  @Output() logout$ = new EventEmitter<void>();

  copyUID(uid: string) {
    this.copyUID$.emit(uid);
  }

  logout() {
    this.logout$.emit();
  }
}
