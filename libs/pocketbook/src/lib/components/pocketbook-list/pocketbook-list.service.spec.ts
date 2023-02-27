import { TestBed } from '@angular/core/testing';

import { PocketbookListService } from './pocketbook-list.service';

describe('PocketbookListService', () => {
  let service: PocketbookListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
