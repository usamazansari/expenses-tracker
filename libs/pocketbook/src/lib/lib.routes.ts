import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import {
  PocketbookAddComponent,
  PocketbookEditComponent,
  PocketbookListComponent
} from './components';

export const pocketbookRoutes: Route[] = [
  {
    path: 'list',
    component: PocketbookListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'add', component: PocketbookAddComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: PocketbookEditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
