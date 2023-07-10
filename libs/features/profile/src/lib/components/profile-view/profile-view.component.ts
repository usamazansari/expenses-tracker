import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { User } from 'firebase/auth';

import { ExtractInitialsPipe } from '../../pipes';

import { ComponentFlags, ProfileViewService } from './profile-view.service';
import { INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

@Component({
  selector: 'expenses-tracker-profile-view',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe],
  templateUrl: './profile-view.component.html'
})
export class ProfileViewComponent implements OnInit {
  user = signal<User | null>(null);
  flags = signal<ComponentFlags>({
    logout: INITIAL_FLAGS,
    user: INITIAL_FLAGS
  });

  #service = inject(ProfileViewService);

  ngOnInit() {
    this.flags.update(value => ({ ...value, user: { ...value.user, loading: true } }));
    this.#service.watchUser$().subscribe({
      next: user => {
        this.flags.update(value => ({ ...value, user: { ...value.user, loading: false, success: true, fail: false } }));
        this.user.set(user);
      },
      error: error => {
        this.flags.update(value => ({ ...value, user: { ...value.user, loading: false, success: false, fail: true } }));
        // TODO: @usamazansari: investigate if there would ever be an error
        console.error({ error });
      }
    });
  }
  copyUID(uid = '') {
    // this.copyUID$.emit(uid);
  }

  logout() {
    // this.logout$.emit();
  }
}
