import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import { TooltipComponent } from '@expenses-tracker/shared/common';
import { INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { ExtractInitialsPipe } from '../../pipes';

@Component({
  selector: 'expenses-tracker-profile-view',
  standalone: true,
  imports: [CommonModule, ExtractInitialsPipe, TooltipComponent],
  templateUrl: './profile-view.component.html'
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  user = signal<User | null>(null);
  ownedPocketbookListCount = signal<number>(0);
  collaboratedPocketbookListCount = signal<number>(0);
  flags = signal<ComponentFlags>({
    logout: INITIAL_FLAGS,
    user: INITIAL_FLAGS,
    ownedPocketbookListCount: INITIAL_FLAGS,
    collaboratedPocketbookListCount: INITIAL_FLAGS
  });

  #logout$!: Subscription;

  #service = inject(ProfileViewService);
  ownedPocketbookTooltip: unknown;
  ngOnInit() {
    this.fetchUserInformation();
    this.fetchOwnedPocketbookListCount();
    this.fetchCollaboratedPocketbookListCount();
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
