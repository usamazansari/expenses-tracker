import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import {
  PocketbookAddComponent,
  PocketbookCardComponent,
  PocketbookDetailComponent,
  PocketbookEditComponent,
  PocketbookListComponent,
  PocketbookOwnerListComponent,
  PocketbookCollaboratorListComponent
} from './components';

export const pocketbookRoutes: Route[] = [
  {
    path: '',
    component: PocketbookCardComponent,
    children: [
      {
        path: 'list',
        component: PocketbookListComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'owner', component: PocketbookOwnerListComponent },
          { path: 'collaborator', component: PocketbookCollaboratorListComponent },
          { path: '', redirectTo: 'owner', pathMatch: 'full' }
        ]
      },
      { path: 'add', component: PocketbookAddComponent, canActivate: [AuthGuard] },
      {
        path: ':id/transaction',
        component: PocketbookDetailComponent,
        loadChildren: () =>
          import('@expenses-tracker/features/transaction').then(m => m.transactionRoutes)
      },
      { path: ':id', redirectTo: ':id/transaction', pathMatch: 'full' },
      { path: ':id/edit', component: PocketbookEditComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];
