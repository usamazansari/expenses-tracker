import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AuthGraphicComponent,
  LogoGraphicComponent
} from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LogoGraphicComponent,
    AuthGraphicComponent
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Output() gotoHome$ = new EventEmitter<void>();
  @Output() gotoAuth$ = new EventEmitter<void>();

  gotoHome() {
    this.gotoHome$.emit();
  }

  gotoAuth() {
    this.gotoAuth$.emit();
  }
}
