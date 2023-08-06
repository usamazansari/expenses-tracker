import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from 'firebase/auth';

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
  user = signal<User | null>(null);
  #fb = inject(FormBuilder);
  #service = inject(ProfileEditService);
  displayName = signal<FormControlExtras<DisplayNameEditForm, 'displayName'>>({
    name: 'displayName',
    value: '',
    error: { flag: false, message: '' }
  });
  #editDisplayName$!: Subscription;

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<DisplayNameEditForm>>({
      displayName: this.#fb.control<string>(this.user()?.displayName ?? '') as FormControl<string>
    });
    this.#service.watchUser$().subscribe(user => {
      this.user.set(user);
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
