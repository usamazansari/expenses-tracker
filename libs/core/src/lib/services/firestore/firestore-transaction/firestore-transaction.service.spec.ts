import { TestBed } from '@angular/core/testing';

import { FirestoreTransactionService } from './firestore-transaction.service';

describe('FirestoreTransactionService', () => {
  let service: FirestoreTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
