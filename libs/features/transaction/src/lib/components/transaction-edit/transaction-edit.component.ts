import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  FormGroupTypeGenerator,
  PaymentMode,
  TransactionCategory,
  TransactionType
} from '@expenses-tracker/shared/interfaces';

import { TransactionForm } from '../../types';
import { TransactionEditService } from './transaction-edit.service';

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

  formGroup!: FormGroup<FormGroupTypeGenerator<TransactionForm>>;

  ngOnInit() {
    this.formGroup = this.#formBuilder.group<FormGroupTypeGenerator<TransactionForm>>({
      amount: this.#formBuilder.control<number | null>(null, Validators.required) as FormControl<number>,
      category: this.#formBuilder.control<TransactionCategory>(
        'other',
        Validators.required
      ) as FormControl<TransactionCategory>,
      transactionType: this.#formBuilder.control<TransactionType>(
        'expense',
        Validators.required
      ) as FormControl<TransactionType>,
      message: this.#formBuilder.control<string>('') as FormControl<string>,
      paymentMode: this.#formBuilder.control<PaymentMode>('card', Validators.required) as FormControl<PaymentMode>,
      timestamp: this.#formBuilder.control<Date>(new Date(Date.now()), Validators.required) as FormControl<Date>
    });

    this.#patchValues$ = this.#service.patchValues$().subscribe(patchValues => {
      this.formGroup.patchValue(patchValues);
    });
  }

  editTransaction() {
    if (!this.formGroup.invalid) {
      const { amount, category, transactionType: direction, message } = this.formGroup.value;
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
