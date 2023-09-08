import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionAddDialogComponent } from './transaction-add-dialog.component';

describe('TransactionAddDialogComponent', () => {
  let component: TransactionAddDialogComponent;
  let fixture: ComponentFixture<TransactionAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TransactionAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
