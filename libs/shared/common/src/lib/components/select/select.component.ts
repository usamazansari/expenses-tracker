import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SelectWrapper } from './select.types';

@Component({
  selector: 'expenses-tracker-select',
  standalone: true,
  imports: [CommonModule, CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './select.component.html'
})
export class SelectComponent<T> {
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

  inputDisplayValue = computed(() => `${this.selected()?.label}`);
  showDropdown = signal(true);

  @Output() selectionChange$ = new EventEmitter<T>();

  selectionChange($: SelectWrapper<T>) {
    this.selected.set($);
    this.showDropdown.set(false);
    this.selectionChange$.emit($.value);
  }

  dataTracker(index: number, item: SelectWrapper<T>) {
    return item.value;
  }

  toggleDropdown() {
    this.showDropdown.update(v => !v);
  }
}
