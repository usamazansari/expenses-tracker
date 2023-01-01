import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'expenses-tracker-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  @Output() navigate$ = new EventEmitter<string>();

  navigate(path = '') {
    this.navigate$.emit(path);
  }
}
