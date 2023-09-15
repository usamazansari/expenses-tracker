import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarYearViewComponent } from './calendar-year-view.component';

describe('CalendarYearViewComponent', () => {
  let component: CalendarYearViewComponent;
  let fixture: ComponentFixture<CalendarYearViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CalendarYearViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
