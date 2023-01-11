import { Route } from '@angular/router';

import { AuthComponent, LoginComponent, SignupComponent } from './components';

export const authRoutes: Route[] = [
  { path: '', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
