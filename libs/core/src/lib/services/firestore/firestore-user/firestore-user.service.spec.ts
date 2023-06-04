import { TestBed } from '@angular/core/testing';

import { FirestoreUserService } from './firestore-user.service';

describe('FirestoreUserService', () => {
  let service: FirestoreUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
