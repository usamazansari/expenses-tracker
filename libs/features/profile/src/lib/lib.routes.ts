import { Route } from '@angular/router';
import { inject } from '@angular/core';

import { AuthGuard } from '@expenses-tracker/auth';

import { ProfileComponent, ProfileEditComponent, ProfileViewComponent } from './components';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [() => inject(AuthGuard).canActivate()]
    // children: [
    //   { path: '', component: ProfileViewComponent },
    //   { path: 'edit', component: ProfileEditComponent }
    // ]
  }
];
