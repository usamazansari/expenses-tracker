import { Route } from '@angular/router';

import {
  TransactionListComponent,
  TransactionAddComponent,
  TransactionEditComponent
} from './components';

export const transactionRoutes: Route[] = [
  { path: 'list', component: TransactionListComponent },
  { path: 'add', component: TransactionAddComponent },
  { path: ':id/edit', component: TransactionEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
