import { Route } from '@angular/router';

import { PocketbookListComponent } from './components';
export const pocketbookRoutes: Route[] = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: PocketbookListComponent }
];
