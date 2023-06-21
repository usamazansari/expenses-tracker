import { appConfig } from './app/app.config';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

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

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
