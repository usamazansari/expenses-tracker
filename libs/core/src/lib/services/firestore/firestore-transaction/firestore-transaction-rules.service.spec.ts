import { TestBed } from '@angular/core/testing';

import { FirestoreTransactionRulesService } from './firestore-transaction-rules.service';

describe('FirestoreTransactionRulesService', () => {
  let service: FirestoreTransactionRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreTransactionRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
