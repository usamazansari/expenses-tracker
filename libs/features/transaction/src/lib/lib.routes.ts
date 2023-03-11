import { Route } from '@angular/router';

import { TransactionListComponent } from './components';

export const transactionRoutes: Route[] = [
  { path: 'list', component: TransactionListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
