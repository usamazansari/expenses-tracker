import { TestBed } from '@angular/core/testing';

import { PocketbookAddService } from './pocketbook-add.service';

describe('PocketbookAddService', () => {
  let service: PocketbookAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
