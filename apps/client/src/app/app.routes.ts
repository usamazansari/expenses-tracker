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
  },
  {
    path: 'pocketbook',
    loadChildren: () =>
      import('@expenses-tracker/pocketbook').then(m => m.pocketbookRoutes)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@expenses-tracker/profile').then(m => m.profileRoutes)
  }
];
