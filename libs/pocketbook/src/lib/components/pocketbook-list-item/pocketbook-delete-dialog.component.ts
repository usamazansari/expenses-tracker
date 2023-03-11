import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { DeletePocketbookGraphicComponent } from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-pocketbook-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatRippleModule,
    DeletePocketbookGraphicComponent
  ],
  template: `
    <div
      class="grid p-6 gap-6 rounded-lg border bg-et-layer-alternate text-et-color-fg-default border-et-color-button-default-border">
      <div class="flex items-center gap-2">
        <expenses-tracker-delete-pocketbook-graphic
          class="w-20 fill-et-color-fg-danger"></expenses-tracker-delete-pocketbook-graphic>
        <p class="text-3xl text-et-color-fg-danger">Delete Pocketbook</p>
      </div>
      <div class="">
        <p class="">Are you sure you want to delete the pocketbook?</p>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center justify-center gap-6">
          <button
            matRipple
            [mat-dialog-close]="true"
            type="button"
            class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center text-et-color-button-danger bg-et-color-button-danger-bg rounded-lg cursor-pointer font-bold">
            <mat-icon class="min-w-[24px]">delete</mat-icon>
            <span>YES</span>
          </button>
          <button
            matRipple
            mat-dialog-close
            type="button"
            class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center rounded-lg cursor-pointer hover:underline hover:underline-offset-4 text-et-color-button-default bg-et-color-button-default-bg hover:text-et-color-button-accent">
            <mat-icon class="min-w-[24px]">clear</mat-icon>
            <span>NO</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PocketbookDeleteDialogComponent {}
