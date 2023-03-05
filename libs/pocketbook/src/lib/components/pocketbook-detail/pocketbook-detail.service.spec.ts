import { TestBed } from '@angular/core/testing';

import { PocketbookDetailService } from './pocketbook-detail.service';

describe('PocketbookDetailService', () => {
  let service: PocketbookDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
