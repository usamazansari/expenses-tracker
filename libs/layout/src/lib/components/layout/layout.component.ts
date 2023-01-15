import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'expenses-tracker-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NotificationComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}
