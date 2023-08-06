import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ExtractInitialsPipe } from '../../pipes';
import { ProfileEditService } from './profile-edit.service';

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ExtractInitialsPipe],
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent {
  #service = inject(ProfileEditService);
  editMode = computed(() => this.#service.editMode());
  user = computed(() => this.#service.user());

  gotoEditProperty(property: 'displayName' | 'password') {
    this.#service.gotoEditProperty(property);
  }

  editProfile() {
    throw new Error('Method not implemented.');
  }
}
