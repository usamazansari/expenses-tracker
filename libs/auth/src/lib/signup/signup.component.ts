import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RegisterGraphicComponent } from '@expenses-tracker/shared/assets';

@Component({
  selector: 'expenses-tracker-signup',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RegisterGraphicComponent,
    MatIconModule
  ],
  templateUrl: './signup.component.html'
})
export class SignupComponent {}
