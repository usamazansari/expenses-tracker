import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { TooltipModule } from '@expenses-tracker/shared/common';
import { INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';
import { ExtractInitialsPipe } from '@expenses-tracker/shared/common';

import { ComponentFlags, ProfileViewService } from './profile-view.service';

@Component({
  selector: 'expenses-tracker-profile-view',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe, TooltipModule],
  templateUrl: './profile-view.component.html'
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  ownedPocketbookListCount = signal<number>(0);
  collaboratedPocketbookListCount = signal<number>(0);
  flags = signal<ComponentFlags>({
    logout: INITIAL_FLAGS,

    ownedPocketbookListCount: INITIAL_FLAGS,
    collaboratedPocketbookListCount: INITIAL_FLAGS
  });

  #logout$!: Subscription;

  #service = inject(ProfileViewService);
  user = computed(() => this.#service.user());

  ngOnInit() {
    this.fetchOwnedPocketbookListCount();
    this.fetchCollaboratedPocketbookListCount();
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

  copyEmail() {
    this.#service.copyEmail(this.user()?.email ?? '');
  }

  logout() {
    this.flags.update(value => ({ ...value, logout: { ...value.logout, loading: true } }));
    this.#logout$ = this.#service.logout$().subscribe({
      next: () => {
        this.flags.update(value => ({
          ...value,
          logout: { ...value.logout, loading: false, success: true, fail: false }
        }));
      },
      error: error => {
        this.flags.update(value => ({
          ...value,
          logout: { ...value.logout, loading: false, success: false, fail: true }
        }));
        console.error({ error });
      }
    });
  }

  gotoEditProfile() {
    this.#service.gotoEditProfile();
  }

  gotoPocketbookList() {
    this.#service.gotoPocketbookList();
  }

  ngOnDestroy() {
    this.#logout$?.unsubscribe();
  }
}
