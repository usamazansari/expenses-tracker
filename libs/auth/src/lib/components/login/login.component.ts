import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';

import { ComponentFlags, LoginService } from './login.service';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

type FromControlExtras = {
  name: string;
  value: string;
  error: {
    flag: boolean;
    message: string;
  };
};

@Component({
  selector: 'expenses-tracker-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<LoginForm>;
  error$ = new BehaviorSubject<string>('');
  flags$!: Observable<ComponentFlags>;
  #login$!: Subscription;

  #fb = inject(FormBuilder);
  #service = inject(LoginService);

  email = signal<FromControlExtras>({
    name: 'email',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  password = signal<FromControlExtras>({
    name: 'password',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  ngOnInit() {
    this.formGroup = this.#fb.group<LoginForm>({
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

  private getError(control: FormControl<string>): boolean {
    return control.touched && !!control.errors;
  }

  login() {
    if (!this.formGroup.invalid) {
      const { email, password } = this.formGroup.value;
      this.#login$ = this.#service.login$({ email, password }).subscribe({
        next: () => {
          this.formGroup.reset();
        }
      });
    }
  }

  dismissError() {
    this.#service.dismissError();
  }

  getErrorMessage(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }

    if (this.formGroup.get(formControlName)?.hasError('email')) {
      return 'Invalid Email';
    }

    return `Unknown validation error for ${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)}`;
  }

  ngOnDestroy() {
    this.#login$?.unsubscribe();
  }
}
