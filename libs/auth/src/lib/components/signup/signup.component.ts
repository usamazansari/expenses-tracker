import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormGroupTypeGenerator, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

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

  flags = signal<ComponentFlags>({ signup: INITIAL_FLAGS });

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

  ngOnDestroy() {
    this.#signup$?.unsubscribe();
  }
}
