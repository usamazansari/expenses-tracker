import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { LoginGraphicComponent } from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-login',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LoginGraphicComponent,
    MatIconModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {}
