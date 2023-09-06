import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription, switchMap } from 'rxjs';

import { AvatarComponent, ExtractInitialsPipe, TooltipModule } from '@expenses-tracker/shared/common';

import { PocketbookDetailService } from './pocketbook-detail.service';

@Component({
  selector: 'expenses-tracker-pocketbook-detail',
  standalone: true,
  imports: [AvatarComponent, CommonModule, DialogModule, ExtractInitialsPipe, RouterModule, TooltipModule],
  templateUrl: './pocketbook-detail.component.html'
})
export class PocketbookDetailComponent implements OnDestroy {
  #service = inject(PocketbookDetailService);
  pocketbook = computed(() => this.#service.pocketbook());
  collaboratorList = computed(() => this.#service.collaboratorList());
  owner = computed(() => this.#service.owner());
  viewMode = computed(() => this.#service.viewMode());
  flags = computed(() => this.#service.flags());
  #pocketbookContributors$!: Subscription;
  #transactionAddDialogSubscription$!: Subscription;
  #recalculateBalanceSubscription$!: Subscription;

  constructor() {
    // NOTE: @usamazansari: be very careful while using toObservable as it may cause memory leak
    this.#pocketbookContributors$ = toObservable(this.pocketbook)
      .pipe(switchMap(() => this.#service.watchPocketbookContributors$()))
      .subscribe();
  }

  collaboratorListTrack(index: number, user: User) {
    return user.uid;
  }

  recalculateBalance() {
    this.#recalculateBalanceSubscription$ = this.#service.recalculateBalance().subscribe();
  }

  gotoTransactionList() {
    this.#service.gotoTransactionList();
  }

  gotoSettings() {
    this.#service.gotoSettings();
  }

  ngOnDestroy() {
    this.#pocketbookContributors$?.unsubscribe();
    this.#transactionAddDialogSubscription$?.unsubscribe();
    this.#recalculateBalanceSubscription$?.unsubscribe();
  }
}
