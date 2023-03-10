import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'expenses-tracker-pocketbook-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="relative p-4 border rounded-lg min-h-[50vh] bg-et-layer-alternate">
    <router-outlet></router-outlet>
  </div>`,
  styles: []
})
export class PocketbookCardComponent {}
