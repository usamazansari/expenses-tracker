import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase/app';

/**
 * @deprecated Use strings for errors
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  #errorMap = new Map<FirebaseError['code'], string>([
    ['auth/email-already-in-use', 'The email entered is already in use'],
    ['auth/invalid-email', 'Invalid Email address'],
    ['auth/network-request-failed', 'Unable to connect to the service, please try again later'],
    ['auth/user-not-found', 'A user with the entered email does not exist'],
    ['auth/weak-password', 'The password is too weak'],
    ['auth/wrong-password', 'Incorrect password'],
    ['email-email', 'Email is invalid'],
    ['email-required', 'Email is required'],
    ['password-required', 'Password is required'],
    ['permission-denied', 'You do not have sufficient permissions']
  ]);

  /**
   * @deprecated Use strings for errors
   */
  getError(message: string) {
    return this.#errorMap.get(message) ?? `Unknown error: ${message}`;
  }
}
