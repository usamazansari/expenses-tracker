import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { TooltipModule } from '../../tooltip';

import { CalendarMonthViewComponent } from './calendar-month-view/calendar-month-view.component';
import { CalendarViewMode } from './calendar.types';

@Component({
  selector: 'expenses-tracker-calendar',
  standalone: true,
  imports: [CalendarMonthViewComponent, CommonModule, TooltipModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {
  #epoch = new Date();
  view = signal<Date>(this.#epoch);
  viewMode = signal<CalendarViewMode>('month');
  selectedDate = signal<Date>(this.#epoch);
  @Input() set selectedDateInput(value: Date) {
    this.selectedDate.set(value);
    this.view.set(value);
  }
  showWeekNumbers = signal(false);
  @Input() set showWeekNumbersInput(value: boolean) {
    this.showWeekNumbers.set(value);
  }

  @Output() dateSelected$ = new EventEmitter<Date>();

  selectDate(day: Date) {
    this.selectedDate.set(day);
    this.dateSelected$.emit(day);
  }
}
