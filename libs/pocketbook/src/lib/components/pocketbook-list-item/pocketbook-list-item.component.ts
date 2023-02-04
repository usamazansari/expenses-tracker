import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

import {
  IPocketbook,
  POCKETBOOK_STUB
} from '@expenses-tracker/shared/interfaces';

@Component({
  selector: 'expenses-tracker-pocketbook-list-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pocketbook-list-item.component.html',
  styles: []
})
export class PocketbookListItemComponent {
  #pocketBook$ = new BehaviorSubject<IPocketbook>(POCKETBOOK_STUB);
  @Input() set pocketbook(value: IPocketbook) {
    this.#pocketBook$.next(value);
  }
  get pocketbook() {
    return this.#pocketBook$.getValue();
  }
}
