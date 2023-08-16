import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'expenses-tracker-pocketbook-delete-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="grid p-6 gap-6 rounded-lg border bg-et-layer-alternate text-et-color-fg-default border-et-color-button-default-border">
      <div class="flex items-center gap-2">
        <p class="text-3xl text-et-color-fg-danger">Delete Pocketbook</p>
      </div>
      <div class="">
        <p class="">Are you sure you want to delete the pocketbook?</p>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center justify-center gap-6">
          <button
            type="button"
            class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center text-et-color-button-danger bg-et-color-button-danger-bg rounded-lg cursor-pointer font-bold"
            (click)="deletePocketbook()">
            <span class="material-icons min-w-[24px]">delete</span>
            <span>YES</span>
          </button>
          <button
            type="button"
            class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center rounded-lg cursor-pointer  text-et-color-button-default bg-et-color-button-default-bg hover:text-et-color-button-accent"
            (click)="dismissDialog()">
            <span class="material-icons min-w-[24px]">clear</span>
            <span>NO</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PocketbookDeleteDialogComponent {
  #dialogRef = inject(DialogRef);

  deletePocketbook() {
    this.#dialogRef.close(true);
  }
  dismissDialog() {
    this.#dialogRef.close(false);
  }
}
