import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NotificationComponent } from '@expenses-tracker/shared/common';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'expenses-tracker-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NotificationComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}
