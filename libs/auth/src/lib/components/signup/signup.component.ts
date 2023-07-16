import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormGroupTypeGenerator, FromControlExtras, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { ComponentFlags, ComponentForm, SignupService } from './signup.service';

@Component({
  selector: 'expenses-tracker-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<ComponentForm>>;
  #signup$!: Subscription;

  #fb = inject(FormBuilder);
  #service = inject(SignupService);

  email = signal<FromControlExtras<ComponentForm, 'email'>>({
    name: 'email',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  password = signal<FromControlExtras<ComponentForm, 'password'>>({
    name: 'password',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  flags = signal<ComponentFlags>({ signup: INITIAL_FLAGS });

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<ComponentForm>>({
      email: this.#fb.control<string>('', {
        validators: [Validators.required, Validators.email]
      }) as FormControl<string>,
      password: this.#fb.control<string>('', {
        validators: [Validators.required]
      }) as FormControl<string>
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.email.update(props => ({
        ...props,
        value: this.formGroup.controls.email.value,
        error: {
          flag: this.getError(this.formGroup.controls.email),
          message: this.getErrorMessage(props.name)
        }
      }));
      this.password.update(props => ({
        ...props,
        value: this.formGroup.controls.password.value,
        error: {
          flag: this.getError(this.formGroup.controls.password),
          message: this.getErrorMessage(props.name)
        }
      }));
    });
  }

  signup() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.flags.update(value => ({ ...value, signup: { ...value.signup, loading: true } }));
      this.#signup$ = this.#service.signup$({ email, password } as ComponentForm).subscribe({
        next: () => {
          this.flags.update(value => ({
            ...value,
            signup: { ...value.signup, loading: false, success: true, fail: false }
          }));
          this.formGroup.reset();
        },
        error: () => {
          this.flags.update(value => ({
            ...value,
            signup: { ...value.signup, loading: false, success: false, fail: true }
          }));
        }
      });
    }
  }

  checkControl(formControl: FromControlExtras<ComponentForm, keyof ComponentForm>) {
    switch (formControl.name) {
      case 'email':
        this.email.update(props => ({
          ...props,
          error: {
            flag: this.getError(this.formGroup.controls.email),
            message: this.getErrorMessage(props.name)
          }
        }));
        break;
      case 'password':
        this.password.update(props => ({
          ...props,
          error: {
            flag: this.getError(this.formGroup.controls.email),
            message: this.getErrorMessage(props.name)
          }
        }));
        break;

      default:
        break;
    }
  }

  private getError(control: FormControl<string>): boolean {
    return control.touched && !!control.errors;
  }

  private getErrorMessage(formControlName: keyof ComponentForm) {
    if (this.formGroup.controls[formControlName]?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }

    if (this.formGroup.controls[formControlName]?.hasError('email')) {
      return 'Invalid Email';
    }

    return `Unknown validation error for ${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)}`;
  }

  ngOnDestroy() {
    this.#signup$?.unsubscribe();
  }
}
