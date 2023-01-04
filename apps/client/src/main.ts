import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideImgixLoader } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation
} from '@angular/router';
import firebase from 'firebase/compat/app';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

const devEnv = isDevMode();
const firebaseConfig = {
  apiKey: 'AIzaSyDWMOv0m9vA37Uk7bUClfcB6dtJ0VwVv84',
  appId: '1:996752641056:web:c4ab663b5a61a85b264045',
  authDomain: 'ua-expenses-tracker.firebaseapp.com',
  measurementId: 'G-ZM3ZXXJKQ0',
  messagingSenderId: '996752641056',
  projectId: 'ua-expenses-tracker',
  storageBucket: 'ua-expenses-tracker.appspot.com'
};

if (devEnv) firebase.firestore.setLogLevel('debug');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideImgixLoader(
      devEnv
        ? 'http://localhost:8080'
        : 'https://ua-expenses-tracker.firebaseapp.com/'
    ),
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      BrowserAnimationsModule
    ),
    {
      provide: AUTH_EMULATOR,
      useValue: devEnv ? ['http://localhost:9099', 9099] : undefined
    },
    {
      provide: DATABASE_EMULATOR,
      useValue: devEnv ? ['http://localhost', 9000] : undefined
    },
    {
      provide: FIRESTORE_EMULATOR,
      useValue: devEnv ? ['localhost', 8088] : undefined
    },
    {
      provide: FUNCTIONS_EMULATOR,
      useValue: devEnv ? ['http://localhost', 5001] : undefined
    }
  ]
}).catch(err => console.error(err));
