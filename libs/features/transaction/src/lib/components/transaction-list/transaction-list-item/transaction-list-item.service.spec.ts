import { TestBed } from '@angular/core/testing';

import { TransactionListItemService } from './transaction-list-item.service';

describe('TransactionListItemService', () => {
  let service: TransactionListItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionListItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
