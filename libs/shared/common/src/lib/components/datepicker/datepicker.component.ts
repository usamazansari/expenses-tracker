import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// TODO: @usamazansari: Implement overlay for the datepicker

@Component({
  selector: 'expenses-tracker-datepicker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datepicker.component.html',
  styles: []
})
export class DatePickerComponent {
  #epoch = new Date();
  label = signal<string>('Select Date');
  formControlName = signal<string>('');
  selectedDate = signal<Date>(this.#epoch);
  @Input() set labelInput(value: string) {
    this.label.set(value);
  }
  @Input() set formControlNameInput(value: string) {
    this.formControlName.set(value);
  }
  @Input() set selectedDateInput(value: Date) {
    this.selectedDate.set(value);
  }
  readonly daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  view = signal<Date>(this.#epoch);
  calendarDays = computed(() => {
    const currentMonthFirstDay = new Date(this.view().getFullYear(), this.view().getMonth(), 1).getDay() - 1;
    const firstDay = new Date(this.view().getFullYear(), this.view().getMonth(), currentMonthFirstDay * -1);
    const currentMonthLastDay = new Date(this.view().getFullYear(), this.view().getMonth() + 1, 0).getDay();
    const lastDay = new Date(this.view().getFullYear(), this.view().getMonth() + 1, 6 - currentMonthLastDay);
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
  inputDisplayValue = computed(() => this.selectedDate().toLocaleDateString('en-IN', { dateStyle: 'long' }));
  showPicker = signal(true);

  changeMonth(delta: number) {
    const next = new Date(this.view().getFullYear(), this.view().getMonth() + delta, 1);
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

  compareWithSelectedDate(day: Date) {
    return day.toLocaleDateString() === this.selectedDate().toLocaleDateString();
  }

  selectDate(day: Date) {
    // This will be called when user selects a date from the calendar
    this.selectedDate.set(day);
    this.showPicker.set(false);
  }

  togglePicker() {
    this.showPicker.update(v => !v);
  }
}
