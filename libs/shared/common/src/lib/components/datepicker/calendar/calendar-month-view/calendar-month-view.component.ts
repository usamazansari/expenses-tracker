import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

import { TooltipModule } from '../../../tooltip';
import { WeekNumberPipe } from './week-number.pipe';

@Component({
  selector: 'expenses-tracker-calendar-month-view',
  standalone: true,
  imports: [CommonModule, TooltipModule, WeekNumberPipe],
  templateUrl: './calendar-month-view.component.html'
})
export class CalendarMonthViewComponent {
  #epoch = new Date();
  readonly daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  view = signal<Date>(this.#epoch);
  @Input() set viewInput(value: Date) {
    this.view.set(value);
  }
  showWeekNumbers = signal(false);
  @Input() set showWeekNumbersInput(value: boolean) {
    this.showWeekNumbers.set(value);
  }
  selectedDate = signal<Date>(this.#epoch);
  @Input() set selectedDateInput(value: Date) {
    this.selectedDate.set(value);
    this.view.set(value);
  }

  calendarDays = computed(() => {
    const date = this.view();
    const currentMonthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
    const firstDay = new Date(date.getFullYear(), date.getMonth(), currentMonthFirstDay * -1);
    const currentMonthLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 6 - currentMonthLastDay);
    const daysDifference = Math.round(Math.abs(lastDay.valueOf() - firstDay.valueOf()) / (1000 * 60 * 60 * 24)) + 1;
    const weeks = [];
    const days = [];
    for (let i = 0; i < daysDifference + 1; i++) {
      days.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + i));
    }
    for (let i = 0; i < daysDifference; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  });

  @Output() dateSelected$ = new EventEmitter<Date>();
  @Output() gotoMonthSelector$ = new EventEmitter<void>();

  changeMonth(delta: number) {
    const date = this.view();
    const next = new Date(date.getFullYear(), date.getMonth() + delta * 1, date.getDate());
    this.view.set(next);
  }

  resetDate() {
    this.#epoch = new Date();
    this.#epoch.setHours(0, 0, 0);
    this.view.set(this.#epoch);

    this.selectedDate.set(this.#epoch);
  }

  weekTracker(index: number, date: Date[]) {
    return date.map(d => d.toLocaleDateString());
  }

  dayTracker(index: number, date: Date) {
    return date.toLocaleDateString();
  }

  selectDate(day: Date) {
    this.dateSelected$.emit(day);
  }

  gotoMonthSelector() {
    this.gotoMonthSelector$.emit();
  }

  isSelectedDate(day: Date) {
    return day.toLocaleDateString() === this.selectedDate().toLocaleDateString();
  }
}
