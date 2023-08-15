import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

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
export class PocketbookListComponent implements OnInit {
  #searchText$ = new Subject<string>();
  pocketbookList = signal<IPocketbook[]>([]);
  #service = inject(PocketbookListService);
  flags = computed(() => this.#service.flags().pocketbookList);
  user = computed(() => this.#service.user());

  constructor() {
    toObservable(this.user).subscribe(() => {
      this.fetchPocketbookList();
    });
  }

  ngOnInit() {
    this.#searchText$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(searchText => {
      console.log({ searchText });
    });
  }

  private fetchPocketbookList() {
    this.#service.fetchPocketbookList().subscribe(pocketbookList => {
      this.pocketbookList.set(pocketbookList);
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
}
