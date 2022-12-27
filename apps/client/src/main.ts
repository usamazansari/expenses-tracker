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
        projectId: 'ua-expenses-tracker',
        appId: '1:996752641056:web:c4ab663b5a61a85b264045',
        storageBucket: 'ua-expenses-tracker.appspot.com',
        apiKey: 'AIzaSyDWMOv0m9vA37Uk7bUClfcB6dtJ0VwVv84',
        authDomain: 'ua-expenses-tracker.firebaseapp.com',
        messagingSenderId: '996752641056',
        measurementId: 'G-ZM3ZXXJKQ0'
      }),
      AngularFireAuthModule,
      AngularFirestoreModule
    )
  ]
}).catch(err => console.error(err));
