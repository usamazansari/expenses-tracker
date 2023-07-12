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
  ownedPocketbookListCount = signal<number>(0);
  collaboratedPocketbookListCount = signal<number>(0);
  flags = signal<ComponentFlags>({
    logout: INITIAL_FLAGS,
    user: INITIAL_FLAGS,
    ownedPocketbookListCount: INITIAL_FLAGS,
    collaboratedPocketbookListCount: INITIAL_FLAGS
  });

  #service = inject(ProfileViewService);

  ngOnInit() {
    this.fetchUserInformation();
    this.fetchOwnedPocketbookListCount();
    this.fetchCollaboratedPocketbookListCount();
  }

  private fetchUserInformation() {
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

  private fetchOwnedPocketbookListCount() {
    this.flags.update(value => ({
      ...value,
      ownedPocketbookListCount: { ...value.ownedPocketbookListCount, loading: true }
    }));
    this.#service.watchOwnedPocketbookListCount$().subscribe({
      next: ownedPocketbookListCount => {
        this.flags.update(value => ({
          ...value,
          ownedPocketbookListCount: { ...value.ownedPocketbookListCount, loading: false, success: true, fail: false }
        }));
        this.ownedPocketbookListCount.set(ownedPocketbookListCount);
      },
      error: error => {
        this.flags.update(value => ({
          ...value,
          ownedPocketbookListCount: { ...value.ownedPocketbookListCount, loading: false, success: false, fail: true }
        }));
        console.error({ error });
      }
    });
  }

  private fetchCollaboratedPocketbookListCount() {
    this.flags.update(value => ({
      ...value,
      collaboratedPocketbookListCount: { ...value.collaboratedPocketbookListCount, loading: true }
    }));
    this.#service.watchCollaboratedPocketbookListCount$().subscribe({
      next: collaboratedPocketbookListCount => {
        this.flags.update(value => ({
          ...value,
          collaboratedPocketbookListCount: {
            ...value.collaboratedPocketbookListCount,
            loading: false,
            success: true,
            fail: false
          }
        }));
        this.collaboratedPocketbookListCount.set(collaboratedPocketbookListCount);
      },
      error: error => {
        this.flags.update(value => ({
          ...value,
          collaboratedPocketbookListCount: {
            ...value.collaboratedPocketbookListCount,
            loading: false,
            success: false,
            fail: true
          }
        }));
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
