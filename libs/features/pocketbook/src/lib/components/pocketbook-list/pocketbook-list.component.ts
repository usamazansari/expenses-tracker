import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { PocketbookListService } from './pocketbook-list.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PocketbookOwnerListComponent } from './pocketbook-owner-list/pocketbook-owner-list.component';
import { PocketbookCollaboratorListComponent } from './pocketbook-collaborator-list/pocketbook-collaborator-list.component';

@Component({
  selector: 'expenses-tracker-pocketbook-list',
  standalone: true,
  imports: [CommonModule, PocketbookOwnerListComponent, PocketbookCollaboratorListComponent],
  templateUrl: './pocketbook-list.component.html',
  styles: []
})
export class PocketbookListComponent implements OnInit {
  #searchText$ = new Subject<string>();
  #service = inject(PocketbookListService);

  ngOnInit() {
    this.#searchText$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(searchText => {
      console.log({ searchText });
    });
  }

  debounceSearch($: KeyboardEvent) {
    this.#searchText$.next(($.target as HTMLInputElement).value);
  }

  addPocketbook() {
    this.#service.gotoAddPocketbook();
  }
}
