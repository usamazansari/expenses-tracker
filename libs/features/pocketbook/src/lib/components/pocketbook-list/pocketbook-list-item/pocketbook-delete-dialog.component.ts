import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'expenses-tracker-pocketbook-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatRippleModule],
  template: `
    <div class="grid p-6  gap-6 rounded border ">
      <div class="">
        <p class="text-xl font-bold ">Delete Pocketbook</p>
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
            class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center text-white bg-danger rounded-lg cursor-pointer font-bold">
            <mat-icon class="min-w-[24px]">delete</mat-icon>
            <span>YES</span>
          </button>
          <button
            matRipple
            mat-dialog-close
            type="button"
            class="flex justify-center items-center w-full gap-2 px-6 py-3 text-center text-primary rounded-lg cursor-pointer hover:underline hover:underline-offset-4">
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
