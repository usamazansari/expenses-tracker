import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// TODO: @usamazansari: Implement overlay for the datepicker

@Component({
  selector: 'expenses-tracker-datepicker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datepicker.component.html',
  styles: []
})
export class DatePickerComponent implements OnInit {
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
  // TODO: @usamazansari: convert this to computed signal wrt this.view()
  calendarDays = signal<Date[][]>([[]]);
  inputDisplayValue = computed(() => this.selectedDate().toLocaleDateString('en-IN', { dateStyle: 'long' }));
  showPicker = signal(true);

  ngOnInit() {
    this.generateCalendar();
  }

  changeMonth(delta: number) {
    this.view.update(today => new Date(today.setMonth(today.getMonth() + delta)));
    this.generateCalendar();
  }

  calculateLastSundayOfPreviousMonth(date: Date): Date {
    const currentMonthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
    return new Date(date.getFullYear(), date.getMonth(), currentMonthFirstDay * -1);
  }

  calculateFirstSaturdayOfNextMonth(date: Date): Date {
    // This will return the first sunday of the next month
    const currentMonthLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    return new Date(date.getFullYear(), date.getMonth() + 1, 6 - currentMonthLastDay);
  }

  // TODO: @usamazansari: Mark this as deprecated
  generateCalendar(): void {
    // generate array of dates for the current month being viewed
    const firstDay = this.calculateLastSundayOfPreviousMonth(this.view());
    const lastDay = this.calculateFirstSaturdayOfNextMonth(this.view());
    const daysDifference = Math.round(Math.abs(lastDay.valueOf() - firstDay.valueOf()) / (1000 * 60 * 60 * 24)) + 1;
    this.calendarDays.update(() => {
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
  }

  weekTracker(index: number, date: Date[]) {
    return date.map(d => d.toLocaleDateString());
  }

  dayTracker(index: number, date: Date) {
    return date.toLocaleDateString();
  }

  selectDate(day: Date) {
    // This will be called when user selects a date from the calendar
    this.selectedDate.set(day);
    this.showPicker.set(false);
  }
}
