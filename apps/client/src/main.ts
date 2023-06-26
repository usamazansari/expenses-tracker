import { provideImgixLoader } from '@angular/common';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import {
  USE_EMULATOR as AUTH_EMULATOR,
  AngularFireAuthModule
} from '@angular/fire/compat/auth';
import {
  AngularFirestoreModule,
  USE_EMULATOR as FIRESTORE_EMULATOR
} from '@angular/fire/compat/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

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

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideImgixLoader(
      devEnv ? 'http://localhost:8080' : 'https://ua-expenses-tracker.firebaseapp.com/'
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
      provide: FIRESTORE_EMULATOR,
      useValue: devEnv ? ['localhost', 8088] : undefined
    }
  ]
}).catch(err => console.error(err));

