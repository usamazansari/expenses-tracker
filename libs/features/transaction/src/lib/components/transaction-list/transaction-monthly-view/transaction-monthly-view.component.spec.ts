import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionMonthlyViewComponent } from './transaction-monthly-view.component';

describe('TransactionMonthlyViewComponent', () => {
  let component: TransactionMonthlyViewComponent;
  let fixture: ComponentFixture<TransactionMonthlyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionMonthlyViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionMonthlyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
