import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

import { TooltipModule } from '../../../tooltip';
import { MonthNamePipe } from './month-name.pipe';

@Component({
  selector: 'expenses-tracker-calendar-year-view',
  standalone: true,
  imports: [CommonModule, TooltipModule, MonthNamePipe],
  templateUrl: './calendar-year-view.component.html'
})
export class CalendarYearViewComponent {
  #epoch = new Date();
  readonly monthsOfYear = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  view = signal<Date>(this.#epoch);
  @Input() set viewInput(value: Date) {
    this.view.set(value);
  }

  selectedDate = signal<Date>(this.#epoch);
  @Input() set selectedDateInput(value: Date) {
    this.selectedDate.set(value);
  }

  @Output() monthSelected$ = new EventEmitter<Date>();

  changeYear(delta: number) {
    const next = new Date(this.view().getFullYear() + delta, 1);
    this.view.set(next);
  }

  resetDate() {
    this.#epoch = new Date();
    this.#epoch.setHours(0, 0, 0);
    this.view.set(this.#epoch);
    this.selectedDate.set(this.#epoch);
  }

  selectMonth(month: number) {
    const selected = new Date(this.view().getFullYear(), month, this.view().getDate());
    this.monthSelected$.emit(selected);
  }

  isSelectedMonth(month: number) {
    return this.selectedDate().getMonth() === month && this.selectedDate().getFullYear() === this.view().getFullYear();
  }
}
