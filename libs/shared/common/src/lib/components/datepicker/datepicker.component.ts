import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';

// TODO: @usamazansari: Implement overlay for the datepicker

@Component({
  selector: 'expenses-tracker-datepicker',
  standalone: true,
  imports: [CalendarComponent, CommonModule, OverlayModule, ReactiveFormsModule],
  templateUrl: './datepicker.component.html',
  styles: []
})
export class DatePickerComponent {
  #epoch = new Date();
  selectedDate = signal<Date>(this.#epoch);

  id = signal<string>('timestamp-input');
  formControlName = signal<string>('');
  @Input() set idInput(value: string) {
    this.id.set(value);
  }
  @Input() set formControlNameInput(value: string) {
    this.formControlName.set(value);
  }

  @Input() set selectedDateInput(value: Date) {
    this.selectedDate.set(value);
  }

  @ViewChild('input') input!: ElementRef;
  inputDisplayValue = computed(() => this.selectedDate().toLocaleDateString('en-IN', { dateStyle: 'long' }));
  showPicker = signal(false);

  togglePicker() {
    this.showPicker.update(v => !v);
  }

  selectDate(day: Date) {
    this.selectedDate.set(day);
    this.showPicker.set(false);
  }
}
