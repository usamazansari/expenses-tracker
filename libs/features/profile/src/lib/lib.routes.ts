import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import {
  ProfileComponent,
  ProfileEditComponent,
  ProfileEditDisplayNameComponent,
  ProfileEditPasswordComponent,
  ProfileViewComponent
} from './components';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      { path: '', component: ProfileViewComponent },
      {
        path: 'edit',
        component: ProfileEditComponent,
        children: [
          { path: 'displayName', component: ProfileEditDisplayNameComponent },
          { path: 'password', component: ProfileEditPasswordComponent },
          { path: '', redirectTo: 'displayName', pathMatch: 'full' }
        ]
      }
    ]
  }
];
