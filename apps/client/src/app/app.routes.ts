import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('@expenses-tracker/auth').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@expenses-tracker/dashboard').then(m => m.dashboardRoutes)
  }
];
