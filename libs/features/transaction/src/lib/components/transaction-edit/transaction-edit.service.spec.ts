import { TestBed } from '@angular/core/testing';

import { TransactionEditService } from './transaction-edit.service';

describe('TransactionEditService', () => {
  let service: TransactionEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
