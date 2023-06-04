import { Route } from '@angular/router';
import { AuthGuard } from '@expenses-tracker/auth';

import { ProfileComponent } from './components/profile/profile.component';
import { inject } from '@angular/core';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  }
];
