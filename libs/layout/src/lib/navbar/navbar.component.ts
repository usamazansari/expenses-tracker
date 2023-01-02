import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'expenses-tracker-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoLogin$ = new EventEmitter<void>();
  @Output() gotoSignup$ = new EventEmitter<void>();

  gotoHome() {
    this.gotoHome$.emit();
  }

  gotoLogin() {
    this.gotoLogin$.emit();
  }

  gotoSignup() {
    this.gotoSignup$.emit();
  }
}
