import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';

import { AvatarComponent, ExtractInitialsPipe } from '@expenses-tracker/shared/common';

import { PocketbookDetailService } from './pocketbook-detail.service';

@Component({
  selector: 'expenses-tracker-pocketbook-detail',
  standalone: true,
  imports: [AvatarComponent, CommonModule, RouterModule, ExtractInitialsPipe],
  templateUrl: './pocketbook-detail.component.html'
})
export class PocketbookDetailComponent {
  #service = inject(PocketbookDetailService);
  pocketbook = computed(() => this.#service.pocketbook());
  collaboratorList = computed(() => this.#service.collaboratorList());
  owner = computed(() => this.#service.owner());

  collaboratorListTrack(index: number, user: User) {
    return user.uid;
  }
}
