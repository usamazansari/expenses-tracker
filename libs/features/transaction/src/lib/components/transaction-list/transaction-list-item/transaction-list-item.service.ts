import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ITransaction } from '@expenses-tracker/shared/interfaces';
import { ContextService } from '@expenses-tracker/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionListItemService {
  #context = inject(ContextService);
  #router = inject(Router);

  editTransaction(transaction: ITransaction) {
    this.#context.setTransaction(transaction);
    this.#router.navigate([
      'pocketbook',
      this.#context.getPocketbook()?.id,
      'transaction',
      this.#context.getTransaction()?.id,
      'edit'
    ]);
  }
}
