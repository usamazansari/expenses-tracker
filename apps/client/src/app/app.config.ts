import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
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
};
