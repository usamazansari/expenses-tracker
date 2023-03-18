import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListItemComponent } from './transaction-list-item.component';

describe('TransactionListItemComponent', () => {
  let component: TransactionListItemComponent;
  let fixture: ComponentFixture<TransactionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
