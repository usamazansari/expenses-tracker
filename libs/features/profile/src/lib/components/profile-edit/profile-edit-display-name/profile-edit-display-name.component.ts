import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormControlExtras, FormGroupTypeGenerator } from '@expenses-tracker/shared/interfaces';

import { Subscription } from 'rxjs';
import { DisplayNameEditForm, ProfileEditService } from '../profile-edit.service';

@Component({
  selector: 'expenses-tracker-profile-edit-display-name',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit-display-name.component.html'
})
export class ProfileEditDisplayNameComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<DisplayNameEditForm>>;
  #fb = inject(FormBuilder);
  #service = inject(ProfileEditService);
  displayName = signal<FormControlExtras<DisplayNameEditForm, 'displayName'>>({
    name: 'displayName',
    value: '',
    error: { flag: false, message: '' }
  });
  #editDisplayName$!: Subscription;
  user = computed(() => this.#service.user());
  flags = computed(() => this.#service.flags().edit.displayName);

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<DisplayNameEditForm>>({
      displayName: this.#fb.control<string>(this.user()?.displayName ?? '') as FormControl<string>
    });
  }

  editDisplayName() {
    if (!this.formGroup.invalid) {
      const { displayName = '' } = this.formGroup.value;
      this.#editDisplayName$ = this.#service.editDisplayName$(displayName).subscribe({
        next: () => {
          this.formGroup.reset();
        }
      });
    }
  }

  cancelEdit() {
    this.formGroup.reset();
    this.#service.cancelEdit();
  }

  ngOnDestroy() {
    this.#editDisplayName$?.unsubscribe();
  }
}
