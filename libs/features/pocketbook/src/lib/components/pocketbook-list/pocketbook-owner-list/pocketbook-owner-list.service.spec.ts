import { TestBed } from '@angular/core/testing';

import { PocketbookOwnerListService } from './pocketbook-owner-list.service';

describe('PocketbookOwnerListService', () => {
  let service: PocketbookOwnerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookOwnerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
