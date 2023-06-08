import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import {
  TransactionListComponent,
  TransactionAddComponent,
  TransactionEditComponent
} from './components';

export const transactionRoutes: Route[] = [
  {
    path: 'list',
    component: TransactionListComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: 'add',
    component: TransactionAddComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  {
    path: ':id/edit',
    component: TransactionEditComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
