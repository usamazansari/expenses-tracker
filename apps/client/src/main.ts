import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation
} from '@angular/router';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        projectId: process.env['ET_PROJECT_ID'],
        appId: process.env['ET_APP_ID'],
        storageBucket: process.env['ET_STORAGE_BUCKET'],
        apiKey: process.env['ET_API_KEY'],
        authDomain: process.env['ET_AUTH_DOMAIN'],
        messagingSenderId: process.env['ET_MESSAGING_SENDER_ID'],
        measurementId: process.env['ET_MEASUREMENT_ID']
      }),
      AngularFireAuthModule,
      AngularFirestoreModule
    )
  ]
}).catch(err => console.error(err));
