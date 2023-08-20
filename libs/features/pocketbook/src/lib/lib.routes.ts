import { Route } from '@angular/router';

import { AuthGuard } from '@expenses-tracker/auth';

import { inject } from '@angular/core';
import { RoutePaths } from '@expenses-tracker/shared/common';
import {
  PocketbookAddComponent,
  PocketbookCardComponent,
  PocketbookDetailComponent,
  PocketbookEditComponent,
  PocketbookListComponent
} from './components';

export const pocketbookRoutes: Route[] = [
  {
    path: RoutePaths.Empty,
    component: PocketbookCardComponent,
    children: [
      {
        path: RoutePaths.EntityList,
        component: PocketbookListComponent,
        canActivate: [() => inject(AuthGuard).canActivate()]
      },
      {
        path: RoutePaths.EntityAdd,
        component: PocketbookAddComponent,
        canActivate: [() => inject(AuthGuard).canActivate()]
      },
      {
        path: RoutePaths.EntityDynamicId,
        component: PocketbookDetailComponent,
        children: [
          {
            path: RoutePaths.Transaction,
            loadChildren: () => import('@expenses-tracker/features/transaction').then(m => m.transactionRoutes)
          },
          {
            path: RoutePaths.EntitySettings,
            component: PocketbookEditComponent,
            canActivate: [() => inject(AuthGuard).canActivate()]
          },
          { path: RoutePaths.Empty, redirectTo: RoutePaths.Transaction, pathMatch: 'full' }
        ]
      },
      { path: RoutePaths.Empty, redirectTo: RoutePaths.EntityList, pathMatch: 'full' }
    ]
  }
];
