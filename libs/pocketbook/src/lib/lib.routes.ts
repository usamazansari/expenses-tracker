import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import { PocketbookAddComponent, PocketbookListComponent } from './components';

export const pocketbookRoutes: Route[] = [
  {
    path: 'list',
    component: PocketbookListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'add', component: PocketbookAddComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
