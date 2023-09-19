import { Route } from '@angular/router';

import {
  TransactionAddComponent,
  TransactionEditComponent,
  TransactionListComponent,
  TransactionListViewComponent
} from './components';
import { formatDate } from '@angular/common';

export const transactionRoutes: Route[] = [
  {
    path: 'list',
    component: TransactionListComponent,
    children: [
      {
        path: ':date',
        component: TransactionListViewComponent
      },
      {
        path: '',
        redirectTo: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        pathMatch: 'full'
      }
    ]
  },
  { path: 'add', component: TransactionAddComponent },
  { path: ':id/edit', component: TransactionEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
