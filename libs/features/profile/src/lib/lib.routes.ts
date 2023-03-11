import { Route } from '@angular/router';
import { AuthGuard } from '@expenses-tracker/auth';

import { ProfileComponent } from './components/profile/profile.component';

export const profileRoutes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];
