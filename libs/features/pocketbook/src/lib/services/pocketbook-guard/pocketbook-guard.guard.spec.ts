import { TestBed } from '@angular/core/testing';

import { PocketbookGuardGuard } from './pocketbook-guard.guard';

describe('PocketbookGuardGuard', () => {
  let guard: PocketbookGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PocketbookGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
