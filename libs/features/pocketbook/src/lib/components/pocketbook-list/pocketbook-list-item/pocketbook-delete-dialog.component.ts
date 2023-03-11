import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'expenses-tracker-pocketbook-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatRippleModule],
  template: `<h2 mat-dialog-title style="font-family: unset;">Delete Pocketbook</h2>
    <mat-dialog-content style="font-family: unset;">
      Are you sure you want to delete the pocketbook?
    </mat-dialog-content>
    <mat-dialog-actions style="display: flex; flex-direction: column;">
      <div class="flex items-center justify-center gap-6">
        <button
          matRipple
          [mat-dialog-close]="true"
          type="button"
          class="flex items-center w-full gap-2 px-6 py-3 text-center text-white bg-red-500 rounded-lg cursor-pointer font-bold">
          <mat-icon class="min-w-[24px]">delete</mat-icon>
          <span>YES</span>
        </button>
        <button
          matRipple
          mat-dialog-close
          type="button"
          class="flex items-center w-full gap-2 px-6 py-3 text-center text-blue-700 rounded-lg cursor-pointer hover:underline hover:underline-offset-4">
          <mat-icon class="min-w-[24px]">clear</mat-icon>
          <span>NO</span>
        </button>
      </div>
    </mat-dialog-actions>`,
  styles: []
})
export class PocketbookDeleteDialogComponent {}
