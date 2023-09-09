import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'expenses-tracker-transaction-delete-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="grid gap-4 p-0 et-card bg-color-canvas-default">
    <div class="flex items-center justify-between p-4 bg-color-canvas-subtle">
      <span class="text-xl font-bold cursor-default text-color-accent-fg">Cancel Operation</span>
      <span
        class="transition-colors duration-200 cursor-pointer material-icons text-color-fg-muted hover:text-color-accent-fg"
        (click)="dismissDialog()">
        clear
      </span>
    </div>
    <div class="grid p-4 gap-4">
      <p class="">Are you sure you want to cancel?</p>

      <div class="grid grid-cols-2 gap-2 lg:gap-4">
        <button type="submit" class="w-full et-button " (click)="dismissDialog()">
          <span class="material-icons min-w-[24px]">clear</span>
          <span>No</span>
        </button>
        <button type="submit" class="w-full et-button et-button-danger" (click)="deleteTransaction()">
          <span class="material-icons min-w-[24px]">done</span>
          <span>Yes</span>
        </button>
      </div>
    </div>
  </div>`
})
export class TransactionDeleteDialogComponent {
  #dialogRef = inject(DialogRef);

  deleteTransaction() {
    this.#dialogRef.close(true);
  }

  dismissDialog() {
    this.#dialogRef.close(false);
  }
}
