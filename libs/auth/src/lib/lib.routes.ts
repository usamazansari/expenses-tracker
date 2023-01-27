import { Route } from '@angular/router';

import { AuthComponent, LoginComponent, SignupComponent } from './components';
import { ReverseAuthGuard } from './services';

export const authRoutes: Route[] = [
  { path: '', component: AuthComponent, canActivate: [ReverseAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
