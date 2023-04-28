import { Route } from '@angular/router';
import { AuthGuard } from '@expenses-tracker/auth';

import { DashboardComponent } from './components';
import { inject } from '@angular/core';
export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  }
];
