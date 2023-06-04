import { TestBed } from '@angular/core/testing';

import { PocketbookEditService } from './pocketbook-edit.service';

describe('PocketbookEditService', () => {
  let service: PocketbookEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
