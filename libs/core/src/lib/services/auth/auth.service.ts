import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from 'firebase/auth';
import { EMPTY, from, switchMap } from 'rxjs';

import { ContextService } from '../context/context.service';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _auth: AngularFireAuth,
    private _firestore: FirestoreService,
    private _context: ContextService
  ) {}

  login$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return from(this._auth.signInWithEmailAndPassword(email ?? '', password ?? ''));
  }

  logout$() {
    return from(this._auth.signOut());
  }

  signup$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return from(this._auth.createUserWithEmailAndPassword(email ?? '', password ?? ''));
  }

  editUserInfo$({ displayName }: { displayName: string }) {
    const user = this._context.getUser();
    return !user
      ? EMPTY
      : from(updateProfile(user, { displayName })).pipe(
          switchMap(() => this._firestore.updateUser$({ displayName }))
        );
  }
}
