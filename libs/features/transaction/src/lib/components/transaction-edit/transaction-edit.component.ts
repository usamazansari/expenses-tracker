import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ITransaction } from '@expenses-tracker/shared/interfaces';

import { ITransactionEditForm, TransactionEditService } from './transaction-edit.service';

type TransactionEditForm<T extends ITransactionEditForm = ITransactionEditForm> = {
  amount: FormControl<T['amount']>;
  category: FormControl<T['category']>;
  direction: FormControl<T['direction']>;
  message: FormControl<T['message']>;
};

@Component({
  selector: 'expenses-tracker-transaction-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-edit.component.html',
  styles: []
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  #editTransaction$!: Subscription;
  #patchValues$!: Subscription;

  #formBuilder = inject(FormBuilder);
  #service = inject(TransactionEditService);

  formGroup!: FormGroup<TransactionEditForm>;

  ngOnInit() {
    this.formGroup = this.#formBuilder.group<TransactionEditForm>({
      amount: this.#formBuilder.control(null, Validators.required),
      category: this.#formBuilder.control(null, Validators.required),
      direction: this.#formBuilder.control('expense', Validators.required),
      message: this.#formBuilder.control(null)
    });

    this.#patchValues$ = this.#service.patchValues$().subscribe(patchValues => {
      this.formGroup.patchValue(patchValues);
    });
  }

  editTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, direction, message } = this.formGroup.value;
      // this.#editTransaction$ = this.#service
      //   .editTransaction$({
      //     amount,
      //     category,
      //     direction,
      //     message
      //   } as ITransaction)
      //   .subscribe({
      //     next: () => {
      //       this.formGroup.reset();
      //     },
      //     error: error => {
      //       console.error({ error });
      //     }
      //   });
    }
  }

  cancelEditTransaction() {
    this.#service.cancelEditTransaction();
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }
    return '';
  }

  ngOnDestroy() {
    this.#editTransaction$?.unsubscribe();
    this.#patchValues$?.unsubscribe();
  }
}
