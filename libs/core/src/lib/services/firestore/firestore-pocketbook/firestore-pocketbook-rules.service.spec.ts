import { TestBed } from '@angular/core/testing';

import { FirestorePocketbookRulesService } from './firestore-pocketbook-rules.service';

describe('FirestorePocketbookRulesService', () => {
  let service: FirestorePocketbookRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorePocketbookRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
