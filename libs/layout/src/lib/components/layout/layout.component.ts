import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@expenses-tracker/auth';

import { NavbarComponent } from '../navbar/navbar.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'expenses-tracker-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NotificationComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.getUser$().subscribe(user => {
      if (!!user && this._router.url.startsWith('/auth')) {
        this._router.navigate(['dashboard']);
      }
    });
  }
}
