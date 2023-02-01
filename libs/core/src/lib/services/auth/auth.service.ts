import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from 'firebase/auth';
import { EMPTY, from } from 'rxjs';

import { ContextService } from '../context/context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _auth: AngularFireAuth,
    private _context: ContextService
  ) {}

  login$({
    email,
    password
  }: {
    email: string | null | undefined;
    password: string | null | undefined;
  }) {
    return from(
      this._auth.signInWithEmailAndPassword(email ?? '', password ?? '')
    );
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
    return from(
      this._auth.createUserWithEmailAndPassword(email ?? '', password ?? '')
    );
  }

  editUserInfo$({ name }: { name: string }) {
    const user = this._context.getUser();
    return !user ? EMPTY : from(updateProfile(user, { displayName: name }));
  }
}
