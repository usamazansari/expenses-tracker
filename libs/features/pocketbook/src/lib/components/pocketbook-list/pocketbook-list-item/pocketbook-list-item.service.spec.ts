import { TestBed } from '@angular/core/testing';

import { PocketbookListItemService } from './pocketbook-list-item.service';

describe('PocketbookListItemService', () => {
  let service: PocketbookListItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookListItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
