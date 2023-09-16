import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';

import { TransactionListViewTypes, ITransactionListSummary } from '@expenses-tracker/shared/interfaces';

@Component({
  selector: 'expenses-tracker-transaction-view-summary-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-view-summary-dialog.component.html'
})
export class TransactionViewSummaryDialogComponent {
  #dialogRef = inject(DialogRef);

  constructor(
    @Inject(DIALOG_DATA)
    public summaryInput: {
      viewMode: TransactionListViewTypes;
      summary: ITransactionListSummary;
      view: Date;
    }
  ) {}

  dismissDialog() {
    this.#dialogRef.close();
  }
}
