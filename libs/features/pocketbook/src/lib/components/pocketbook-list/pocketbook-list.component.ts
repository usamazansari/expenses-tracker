import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { PocketbookListItemComponent } from './pocketbook-list-item/pocketbook-list-item.component';
import { PocketbookListService } from './pocketbook-list.service';

@Component({
  selector: 'expenses-tracker-pocketbook-list',
  standalone: true,
  imports: [CommonModule, PocketbookListItemComponent],
  templateUrl: './pocketbook-list.component.html',
  styles: []
})
export class PocketbookListComponent implements OnInit, OnDestroy {
  #searchText$ = new Subject<string>();
  pocketbookList = signal<IPocketbook[]>([]);
  #service = inject(PocketbookListService);
  flags = computed(() => this.#service.flags().pocketbookList);
  user = computed(() => this.#service.user());
  #pocketbookList$!: Subscription;

  constructor() {
    // NOTE: @usamazansari: be very careful while using toObservable as it may cause memory leak
    this.#pocketbookList$ = toObservable(this.user)
      .pipe(switchMap(() => this.#service.fetchPocketbookList()))
      .subscribe((pocketbookList: IPocketbook[]) => {
        this.pocketbookList.set(pocketbookList);
      });
  }

  ngOnInit() {
    this.#searchText$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(searchText => {
      console.log({ searchText });
    });
  }

  pocketbookListTrack(index: number, pocketbook: IPocketbook) {
    return pocketbook.id;
  }

  isPocketbookOwner(pocketbook: IPocketbook) {
    return pocketbook.owner === this.user()?.uid;
  }

  debounceSearch($: KeyboardEvent) {
    this.#searchText$.next(($.target as HTMLInputElement).value);
  }

  addPocketbook() {
    this.#service.gotoAddPocketbook();
  }

  ngOnDestroy() {
    this.#pocketbookList$?.unsubscribe();
  }
}
