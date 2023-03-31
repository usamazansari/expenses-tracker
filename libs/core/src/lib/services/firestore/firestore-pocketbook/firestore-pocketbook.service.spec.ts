import { TestBed } from '@angular/core/testing';

import { FirestorePocketbookService } from './firestore-pocketbook.service';

describe('FirestorePocketbookService', () => {
  let service: FirestorePocketbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestorePocketbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
