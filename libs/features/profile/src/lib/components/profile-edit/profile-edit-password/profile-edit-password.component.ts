import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormControlExtras, FormGroupTypeGenerator } from '@expenses-tracker/shared/interfaces';

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
  oldPassword = signal<FormControlExtras<PasswordEditForm, 'oldPassword'>>({
    name: 'oldPassword',
    value: '',
    error: { flag: false, message: '' }
  });
  newPassword = signal<FormControlExtras<PasswordEditForm, 'newPassword'>>({
    name: 'newPassword',
    value: '',
    error: { flag: false, message: '' }
  });
  confirmNewPassword = signal<FormControlExtras<PasswordEditForm, 'confirmNewPassword'>>({
    name: 'confirmNewPassword',
    value: '',
    error: { flag: false, message: '' }
  });
  #editPassword$!: Subscription;
  flags = computed(() => this.#service.flags().edit.password);

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<PasswordEditForm>>({
      oldPassword: this.#fb.control<string>('') as FormControl<string>,
      newPassword: this.#fb.control<string>('') as FormControl<string>,
      confirmNewPassword: this.#fb.control<string>('') as FormControl<string>
    });
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
