import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormGroupTypeGenerator, FormControlExtras, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { ComponentFlags, ComponentForm, SignupService } from './signup.service';
import { controlStateValidator } from '@expenses-tracker/shared/common';

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

  email = signal<FormControlExtras<ComponentForm, 'email'>>({
    name: 'email',
    value: '',
    error: {
      flag: false,
      message: ''
    }
  });

  password = signal<FormControlExtras<ComponentForm, 'password'>>({
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
      const { flag: emailFlag, message: emailMessage } = controlStateValidator(this.formGroup, this.email());
      const { flag: passwordFlag, message: passwordMessage } = controlStateValidator(this.formGroup, this.password());
      this.email.update(props => ({
        ...props,
        value: this.formGroup.controls.email.value,
        error: { flag: emailFlag, message: emailMessage }
      }));
      this.password.update(props => ({
        ...props,
        value: this.formGroup.controls.password.value,
        error: { flag: passwordFlag, message: passwordMessage }
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

  checkControl(formControl: FormControlExtras<ComponentForm, keyof ComponentForm>) {
    const { flag, message } = controlStateValidator(this.formGroup, formControl);
    switch (formControl.name) {
      case 'email':
        this.email.update(props => ({ ...props, error: { flag, message } }));
        break;
      case 'password':
        this.password.update(props => ({ ...props, error: { flag, message } }));
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    this.#signup$?.unsubscribe();
  }
}
