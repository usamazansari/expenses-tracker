import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LayoutComponent } from '@expenses-tracker/layout';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  selector: 'expenses-tracker-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private _router: Router) {}
  navigate(path = '') {
    console.log({ path });
    // this._router.navigate([path]);
  }
}
