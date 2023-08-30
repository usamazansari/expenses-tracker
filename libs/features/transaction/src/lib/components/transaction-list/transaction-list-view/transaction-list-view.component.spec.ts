import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListViewComponent } from './transaction-list-view.component';

describe('TransactionListViewComponent', () => {
  let component: TransactionListViewComponent;
  let fixture: ComponentFixture<TransactionListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListViewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
