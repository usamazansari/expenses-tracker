import { computed, inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile, User } from 'firebase/auth';
import { from, switchMap } from 'rxjs';

import { ContextService } from '../context/context.service';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #auth = inject(AngularFireAuth);
  #firestore = inject(FirestoreService);
  #context = inject(ContextService);
  user = computed(() => this.#context.user());

  login$({ email, password }: { email: string | null | undefined; password: string | null | undefined }) {
    return from(this.#auth.signInWithEmailAndPassword(email ?? '', password ?? ''));
  }

  logout$() {
    return from(this.#auth.signOut());
  }

  signup$({ email, password }: { email: string | null | undefined; password: string | null | undefined }) {
    return from(this.#auth.createUserWithEmailAndPassword(email ?? '', password ?? ''));
  }

  updateDisplayName$(displayName: string) {
    return this.updateUserInfo$({ ...this.user(), displayName });
  }

  updateUserInfo$(update: Partial<User>) {
    return from(updateProfile(this.user() as User, { ...update })).pipe(
      switchMap(() => this.#firestore.updateUser$({ ...this.user(), ...update } as Partial<User>))
    );
  }
}
