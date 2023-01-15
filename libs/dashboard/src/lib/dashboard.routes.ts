import { Route } from '@angular/router';
import { AuthGuard } from '@expenses-tracker/auth';

import { DashboardComponent } from './components';
export const dashboardRoutes: Route[] = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] }
];
