import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

/**
 * @deprecated - Removed with material
 */
@Component({
  selector: 'expenses-tracker-transaction-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `<div
    class="grid p-6 gap-6 rounded-lg border bg-et-layer-alternate text-et-color-fg-default border-et-color-button-default-border">
    <div class="flex items-center gap-2">
      <p class="text-3xl text-et-color-fg-danger">Delete Transaction</p>
    </div>
    <div class="">
      <p class="">Are you sure you want to delete the transaction?</p>
    </div>
    <div class="flex flex-col">
      <div class="flex items-center justify-center gap-6">
        <button
          [mat-dialog-close]="true"
          type="button"
          class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center text-et-color-button-danger bg-et-color-button-danger-bg rounded-lg cursor-pointer font-bold">
          <span class="material-icons min-w-[24px]">delete</span>
          <span>YES</span>
        </button>
        <button
          mat-dialog-close
          type="button"
          class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center rounded-lg cursor-pointer  text-et-color-button-default bg-et-color-button-default-bg hover:text-et-color-button-accent">
          <span class="material-icons min-w-[24px]">clear</span>
          <span>NO</span>
        </button>
      </div>
    </div>
  </div>`,
  styles: []
})
export class TransactionDeleteDialogComponent {}
