import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import {
  PocketbookAddComponent,
  PocketbookEditComponent,
  PocketbookListComponent,
  PocketbookOwnerListComponent,
  PocketbookCollaboratorListComponent
} from './components';

export const pocketbookRoutes: Route[] = [
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
  { path: 'edit', component: PocketbookEditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
