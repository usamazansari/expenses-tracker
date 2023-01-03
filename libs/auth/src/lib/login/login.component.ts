import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { LoginGraphicComponent } from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-login',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LoginGraphicComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {}
