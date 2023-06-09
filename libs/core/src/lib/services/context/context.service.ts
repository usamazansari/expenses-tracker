import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, map, of, switchMap, throwError } from 'rxjs';

import { Collections } from '@expenses-tracker/shared/common';
import { IPocketbook, ITransaction } from '@expenses-tracker/shared/interfaces';

import { FirestorePocketbookRulesService as Rules } from '../firestore/firestore-pocketbook/firestore-pocketbook-rules.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  #user$ = new BehaviorSubject<User | null>(null);
  #user: User | null = null;
  #pocketbook$ = new BehaviorSubject<IPocketbook | null>(null);
  #pocketbook: IPocketbook | null = null;
  #owner$ = new BehaviorSubject<User | null>(null);
  #owner: User | null = null;
  #collaboratorList$ = new BehaviorSubject<User[]>([]);
  #collaboratorList: User[] = [];
  #transaction$ = new BehaviorSubject<ITransaction | null>(null);
  #transaction: ITransaction | null = null;

  #auth = inject(AngularFireAuth);
  #router = inject(Router);
  #rules = inject(Rules);
  #firestore = inject(AngularFirestore);

  constructor() {
    this.#fetchUser$();
    this.#fetchPocketbook$();
    this.#fetchOwner$();
    this.#fetchCollaboratorList$();
    this.#fetchTransaction$();
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

  setOwner(owner: User | null) {
    this.#owner = owner ?? null;
    this.#owner$.next(this.#owner);
  }

  resetOwner() {
    this.setOwner(null);
  }

  getOwner() {
    return this.#owner;
  }

  watchOwner$() {
    return this.#owner$.asObservable();
  }

  setCollaboratorList(collaboratorList: User[]) {
    this.#collaboratorList = collaboratorList ?? [];
    this.#collaboratorList$.next(this.#collaboratorList);
  }

  resetCollaboratorList() {
    this.setCollaboratorList([]);
  }

  getCollaboratorList() {
    return this.#collaboratorList;
  }

  watchCollaboratorList$() {
    return this.#collaboratorList$.asObservable();
  }

  setTransaction(transaction: ITransaction | null) {
    this.#transaction = transaction ?? null;
    this.#transaction$.next(this.#transaction);
  }

  resetTransaction() {
    this.setTransaction(null);
  }

  getTransaction() {
    return this.#transaction;
  }

  watchTransaction$() {
    return this.#transaction$.asObservable();
  }

  #fetchUser$() {
    this.#auth.user.subscribe(user => {
      this.setUser(user as User);
    });
  }

  #fetchPocketbook$() {
    this.#router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => (e as NavigationEnd).urlAfterRedirects),
        switchMap(url =>
          url.includes('pocketbook')
            ? this.#firestore
                .collection<IPocketbook<Timestamp>>(Collections.Pocketbook, ref =>
                  ref.where('id', '==', url.match(/pocketbook\/(\w+)\//)?.at(1) ?? '')
                )
                .valueChanges()
                .pipe(
                  map(([pb]) => {
                    if (this.#rules.checkPocketbookAccess(pb, this.getUser() as User)) {
                      return {
                        ...pb,
                        createdAt: (pb?.createdAt as Timestamp)?.toDate()
                      } as IPocketbook;
                    } else {
                      return throwError(() => new Error('no-user-access'));
                    }
                  })
                )
            : of(null)
        )
      )
      .subscribe(pb => {
        this.setPocketbook(pb as IPocketbook);
      });
  }

  #fetchOwner$() {
    this.#firestore
      .collection<Partial<User>>(Collections.User, ref =>
        ref.where('uid', '==', this.#pocketbook?.owner ?? '')
      )
      .valueChanges()
      .pipe(map(([owner]) => owner))
      .subscribe(owner => {
        this.setOwner(owner as User);
      });
  }

  #fetchCollaboratorList$() {
    this.#firestore
      .collection<User>(Collections.User, ref =>
        ref.where('uid', 'in', this.#pocketbook?.collaboratorList ?? [''])
      )
      .valueChanges()
      .subscribe(collaboratorList => {
        this.setCollaboratorList(collaboratorList);
      });
  }

  #fetchTransaction$() {
    this.#router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => (e as NavigationEnd).urlAfterRedirects),
        switchMap(url =>
          url.includes('transaction')
            ? this.#firestore
                .collection<ITransaction<Timestamp>>(Collections.Transaction, ref =>
                  ref.where('id', '==', url.match(/transaction\/(\w+)\//)?.at(1) ?? '')
                )
                .valueChanges()
                .pipe(
                  map(([transaction]) =>
                    !transaction
                      ? null
                      : ({
                          ...transaction,
                          timestamp: (transaction?.timestamp as Timestamp)?.toDate()
                        } as ITransaction)
                  )
                )
            : of(null)
        )
      )
      .subscribe(transaction => {
        this.setTransaction(transaction);
      });
  }

  updateTransactionCalculateBalance({
    old: { amount: oldAmount, direction: oldDirection },
    new: { amount: newAmount, direction: newDirection }
  }: {
    old: ITransaction;
    new: ITransaction;
  }) {
    const balance = this.#pocketbook?.balance ?? 0;
    return oldDirection === newDirection
      ? balance - oldAmount + newAmount
      : oldDirection === 'expense'
      ? balance + oldAmount + newAmount
      : balance - oldAmount - newAmount;
  }

  addTransactionCalculateBalance({ amount, direction }: ITransaction) {
    const balance = this.#pocketbook?.balance ?? 0;
    return direction === 'expense' ? balance - amount : balance + amount;
  }

  deleteTransactionCalculateBalance({ amount, direction }: ITransaction) {
    const balance = this.#pocketbook?.balance ?? 0;
    return direction === 'expense' ? balance + amount : balance - amount;
  }
}
