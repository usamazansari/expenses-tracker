import { inject } from '@angular/core';
import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';
import { RoutePaths } from '@expenses-tracker/shared/common';

import {
  ProfileComponent,
  ProfileEditComponent,
  ProfileEditDisplayNameComponent,
  ProfileEditPasswordComponent,
  ProfileViewComponent
} from './components';

export const profileRoutes: Route[] = [
  {
    path: RoutePaths.Empty,
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
    children: [
      { path: RoutePaths.Empty, component: ProfileViewComponent },
      {
        path: RoutePaths.EntityEdit,
        component: ProfileEditComponent,
        children: [
          { path: RoutePaths.ProfileDisplayName, component: ProfileEditDisplayNameComponent },
          { path: RoutePaths.ProfilePassword, component: ProfileEditPasswordComponent },
          { path: RoutePaths.Empty, redirectTo: RoutePaths.ProfileDisplayName, pathMatch: 'full' }
        ]
      }
    ]
  }
];
