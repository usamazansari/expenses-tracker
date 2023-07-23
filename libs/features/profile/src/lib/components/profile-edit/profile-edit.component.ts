import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'firebase/auth';

import { FormGroupTypeGenerator, FromControlExtras, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { ExtractInitialsPipe } from '../../pipes';
import { ComponentFlags, ComponentForm, ProfileEditService } from './profile-edit.service';

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExtractInitialsPipe],
  templateUrl: './profile-edit.component.html',
  styles: []
})
export class ProfileEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupTypeGenerator<ComponentForm>>;
  user = signal<User | null>(null);
  #fb = inject(FormBuilder);
  #service = inject(ProfileEditService);
  displayName = signal<FromControlExtras<ComponentForm, 'displayName'>>({
    name: 'displayName',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });
  flags = signal<ComponentFlags>({ edit: INITIAL_FLAGS });

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<ComponentForm>>({
      displayName: this.#fb.control<string>(this.user()?.displayName ?? '', {
        validators: [Validators.required]
      }) as FormControl<string>
    });
  }

  checkControl(formControl: FromControlExtras<ComponentForm, keyof ComponentForm>) {
    this.displayName.update(props => ({
      ...props,
      error: {
        flag: this.getError(this.formGroup.controls.displayName),
        message: this.getErrorMessage(props.name)
      }
    }));
  }

  private getError(control: FormControl<string>): boolean {
    return control.touched && !!control.errors;
  }

  private getErrorMessage(formControlName: keyof ComponentForm) {
    if (this.formGroup.controls[formControlName]?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }
    return `Unknown validation error for ${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)}`;
  }

  editProfile() {
    throw new Error('Method not implemented.');
  }

  cancelEdit() {
    this.formGroup.reset();
    this.#service.cancelEdit();
  }
}
