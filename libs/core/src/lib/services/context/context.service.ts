import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #pocketbook: IPocketbook | null = null;

  constructor(
    private _auth: AngularFireAuth,
    private _router: Router,
    private _firestore: AngularFirestore
  ) {
    this._auth.user.subscribe(user => {
      this.setUser(user as User);
    });

    this._router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        switchMap(e => {
          const { urlAfterRedirects } = e as NavigationEnd;
          return this._firestore
            .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref => {
              return ref.where(
                'id',
                '==',
                urlAfterRedirects.match(/pocketbook\/(\w+)\//)?.at(1) ?? ''
              );
            })
            .valueChanges()
            .pipe(
              map(
                ([pb]) =>
                  ({
                    ...pb,
                    createdAt: (pb?.createdAt as Timestamp)?.toDate()
                  } as IPocketbook)
              )
            );
        })
      )
      .subscribe(pb => {
        this.setPocketbook(pb);
      });
  }

  setUser(user: User | null) {
    this.#user = user ?? null;
    this.#user$.next(this.#user);
  }

  getUser() {
    return this.#user;
  }

  watchUser$() {
    return this.#user$.asObservable();
  }

  setPocketbook(pocketbook: IPocketbook | null) {
    this.#pocketbook = pocketbook ?? null;
    this.#pocketbook$.next(this.#pocketbook);
  }

  resetPocketbook() {
    this.setPocketbook(null);
  }

  getPocketbook() {
    return this.#pocketbook;
  }

  watchPocketbook$() {
    return this.#pocketbook$.asObservable();
  }
}
