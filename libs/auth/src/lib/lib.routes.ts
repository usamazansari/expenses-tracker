import { Route } from '@angular/router';

import { AuthComponent, LoginComponent, SignupComponent } from './components';
import { ReverseAuthGuard } from './services';
import { inject } from '@angular/core';

export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [() => inject(ReverseAuthGuard).canActivate()],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];
