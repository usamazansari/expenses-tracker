import { TestBed } from '@angular/core/testing';

import { PocketbookCollaboratorListService } from './pocketbook-collaborator-list.service';

describe('PocketbookCollaboratorListService', () => {
  let service: PocketbookCollaboratorListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbookCollaboratorListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
