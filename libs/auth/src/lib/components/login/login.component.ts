import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormGroupTypeGenerator, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { ComponentFlags, ComponentForm, LoginService } from './login.service';

@Component({
  selector: 'expenses-tracker-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<FormGroupTypeGenerator<ComponentForm>>;
  #login$!: Subscription;

  #fb = inject(FormBuilder);
  #service = inject(LoginService);

  flags = signal<ComponentFlags>({ login: INITIAL_FLAGS });

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<ComponentForm>>({
      email: this.#fb.control<string>('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }) as FormControl<string>,
      password: this.#fb.control<string>('', {
        validators: [Validators.required],
        updateOn: 'change'
      }) as FormControl<string>
    });
  }

  login() {
    if (!this.formGroup.invalid) {
      const { email, password } = this.formGroup.value;
      this.flags.update(value => ({ ...value, login: { ...value.login, loading: true } }));
      this.#login$ = this.#service.login$({ email, password } as ComponentForm).subscribe({
        next: () => {
          this.flags.update(value => ({
            ...value,
            login: { ...value.login, loading: false, success: true, fail: false }
          }));
          this.formGroup.reset();
        },
        error: () => {
          this.flags.update(value => ({
            ...value,
            login: { ...value.login, loading: false, success: false, fail: true }
          }));
        }
      });
    }
  }

  ngOnDestroy() {
    this.#login$?.unsubscribe();
  }
}
