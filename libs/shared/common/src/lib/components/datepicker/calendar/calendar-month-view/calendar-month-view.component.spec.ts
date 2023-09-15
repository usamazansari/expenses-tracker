import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarMonthViewComponent } from './calendar-month-view.component';

describe('CalendarMonthViewComponent', () => {
  let component: CalendarMonthViewComponent;
  let fixture: ComponentFixture<CalendarMonthViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CalendarMonthViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
