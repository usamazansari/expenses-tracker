import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ExtractInitialsPipe } from '@expenses-tracker/shared/common';
import { EditMode, ProfileEditService } from './profile-edit.service';

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ExtractInitialsPipe],
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
  #service = inject(ProfileEditService);
  editMode = computed(() => this.#service.editMode());
  user = computed(() => this.#service.user());

  ngOnInit() {
    this.#service.fetchEditMode();
  }

  gotoEditProperty(property: EditMode) {
    this.#service.gotoEditProperty(property);
  }

  editProfile() {
    throw new Error('Method not implemented.');
  }
}
