import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@expenses-tracker/layout';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  selector: 'expenses-tracker-root',
  templateUrl: './app.component.html'
})
export class AppComponent {}
