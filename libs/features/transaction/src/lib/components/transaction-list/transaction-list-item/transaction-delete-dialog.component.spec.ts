import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDeleteDialogComponent } from './transaction-delete-dialog.component';

describe('TransactionDeleteComponent', () => {
  let component: TransactionDeleteDialogComponent;
  let fixture: ComponentFixture<TransactionDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDeleteDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
