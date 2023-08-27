import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';

@Component({
  selector: 'expenses-tracker-datepicker',
  standalone: true,
  imports: [CalendarComponent, CommonModule, OverlayModule, ReactiveFormsModule],
  templateUrl: './datepicker.component.html'
})
export class DatePickerComponent {
  #epoch = new Date();
  selectedDate = signal<Date>(this.#epoch);
  inputDisplayValue = computed(() => this.selectedDate().toLocaleDateString('en-IN', { dateStyle: 'long' }));
  showPicker = signal(false);

  id = signal<string>('timestamp-input');
  formControl = signal<FormControl<unknown>>(new FormControl());
  @Input() set idInput(value: string) {
    this.id.set(value);
  }
  @Input() set formControlInput(value: FormControl<unknown>) {
    this.formControl.set(value);
  }

  @Input() set selectedDateInput(value: Date) {
    this.selectedDate.set(value);
  }

  @Output() dateSelected$ = new EventEmitter<Date>();

  togglePicker() {
    this.showPicker.update(v => !v);
  }

  selectDate(day: Date) {
    this.selectedDate.set(day);
    this.showPicker.set(false);
    this.dateSelected$.emit(day);
  }
}
