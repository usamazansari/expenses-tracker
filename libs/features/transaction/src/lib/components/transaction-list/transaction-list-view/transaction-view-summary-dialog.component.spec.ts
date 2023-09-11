import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionViewSummaryDialogComponent } from './transaction-view-summary-dialog.component';

describe('TransactionViewSummaryDialogComponent', () => {
  let component: TransactionViewSummaryDialogComponent;
  let fixture: ComponentFixture<TransactionViewSummaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TransactionViewSummaryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionViewSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
