import { TestBed } from '@angular/core/testing';

import { PocketbookCoreService } from './pocketbook-core.service';

describe('PocketbookCoreService', () => {
  let service: PocketbookCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
