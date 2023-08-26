import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectWrapper } from '../select/select.types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'expenses-tracker-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html'
})
export class SwitchComponent<T = unknown> {
  data = signal<SelectWrapper<T>[]>([]);
  @Input() set dataInput(value: SelectWrapper<T>[]) {
    this.data.set(value);
  }
  id = signal<string>('timestamp-input');
  @Input() set idInput(value: string) {
    this.id.set(value);
  }

  formControl = signal<FormControl<unknown>>(new FormControl());
  @Input() set formControlInput(value: FormControl<unknown>) {
    this.formControl.set(value);
  }

  selected = signal<SelectWrapper<T>>({ label: '', value: '' as T });
  @Input() set selectedInput(value: T) {
    this.selected.set({ label: this.data().find(item => item.value === value)?.label ?? '', value });
  }

  @Output() selectionChange$ = new EventEmitter<T>();

  dataTracker(index: number, item: SelectWrapper<T>) {
    return item.value;
  }

  selectionChange($: SelectWrapper<T>) {
    this.selected.set($);
    this.selectionChange$.emit($.value);
  }
}
