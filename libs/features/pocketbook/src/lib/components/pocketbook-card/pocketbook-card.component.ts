import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'expenses-tracker-pocketbook-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="relative et-card rounded-lg mt-24">
    <router-outlet></router-outlet>
  </div>`
})
export class PocketbookCardComponent {}
