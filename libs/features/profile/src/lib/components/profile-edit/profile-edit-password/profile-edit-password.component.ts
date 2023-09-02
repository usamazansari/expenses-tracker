import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormGroupTypeGenerator } from '@expenses-tracker/shared/interfaces';

import { PasswordEditForm, ProfileEditService } from '../profile-edit.service';

@Component({
  selector: 'expenses-tracker-profile-edit-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit-password.component.html'
})
export class ProfileEditPasswordComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<PasswordEditForm>>;
  #fb = inject(FormBuilder);
  #service = inject(ProfileEditService);
  #editPassword$!: Subscription;
  flags = computed(() => this.#service.flags().edit.password);

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<PasswordEditForm>>({
      oldPassword: this.#fb.control<string>('', {
        // TODO: @usamazansari: add a validator to check if the old password is correct
        validators: [Validators.required],
        updateOn: 'change'
      }) as FormControl<string>,
      newPassword: this.#fb.control<string>('', {
        validators: [Validators.required],
        updateOn: 'change'
      }) as FormControl<string>,
      confirmNewPassword: this.#fb.control<string>('', {
        validators: [Validators.required],
        updateOn: 'change'
      }) as FormControl<string>
    });

    // TODO: @usamazansari: Validate newPassword with confirmNewPassword
  }

  editPassword() {
    if (!this.formGroup.invalid) {
      const { oldPassword = '', newPassword = '', confirmNewPassword = '' } = this.formGroup.value;
      this.#service.editPassword$({ oldPassword, newPassword, confirmNewPassword });
      // this.#editPassword$ = this.#service.editPassword$({ oldPassword, newPassword, confirmNewPassword }).subscribe({ next: () => { this.formGroup.reset(); } });
    }
  }

  cancelEdit() {
    this.formGroup.reset();
    this.#service.cancelEdit();
  }

  ngOnDestroy() {
    this.#editPassword$?.unsubscribe();
  }
}
