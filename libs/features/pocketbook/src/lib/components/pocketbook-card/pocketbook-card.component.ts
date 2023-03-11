import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'expenses-tracker-pocketbook-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div
    class="relative p-4 bg-light dark:bg-dark border border-border_color-light dark:border-border_color-dark rounded-lg min-h-[50vh]">
    <router-outlet></router-outlet>
  </div>`,
  styles: []
})
export class PocketbookCardComponent {}
