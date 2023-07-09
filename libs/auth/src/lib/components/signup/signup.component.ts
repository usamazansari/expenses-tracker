import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { FormGroupTypeGenerator, FromControlExtras } from '@expenses-tracker/shared/interfaces';

import { ComponentFlags, SignupService } from './signup.service';

type SignupForm = {
  email: string;
  password: string;
};

@Component({
  selector: 'expenses-tracker-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<SignupForm>>;
  error$ = new BehaviorSubject<string>('');
  flags$!: Observable<ComponentFlags>;
  #signup$!: Subscription;

  #fb = inject(FormBuilder);
  #service = inject(SignupService);

  email = signal<FromControlExtras<SignupForm, 'email'>>({
    name: 'email',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  password = signal<FromControlExtras<SignupForm, 'password'>>({
    name: 'password',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<SignupForm>>({
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

    this.#service.dismissError();
    this.flags$ = this.#service.watchFlags$();
  }

  signup() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.#signup$ = this.#service.signup$({ email, password }).subscribe({
        next: () => {
          this.formGroup.reset();
        }
      });
    }
  }

  private getError(control: FormControl<string>): boolean {
    return control.touched && !!control.errors;
  }

  private getErrorMessage(formControlName: keyof SignupForm) {
    if (this.formGroup.controls[formControlName]?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }

    if (this.formGroup.controls[formControlName]?.hasError('email')) {
      return 'Invalid Email';
    }

    return `Unknown validation error for ${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)}`;
  }

  checkControl(formControl: FromControlExtras<SignupForm, keyof SignupForm>) {
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

  ngOnDestroy() {
    this.#signup$?.unsubscribe();
  }
}
