import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TooltipModule } from '../tooltip';
import { SegmentedControlWrapper } from './segmented-control.types';

@Component({
  selector: 'expenses-tracker-segmented-control',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './segmented-control.component.html'
})
export class SegmentedControlComponent<T = unknown> {
  data = signal<SegmentedControlWrapper<T>[]>([]);
  @Input() set dataInput(value: SegmentedControlWrapper<T>[]) {
    this.data.set(value);
  }
  id = signal<string>('segmented-control-input');
  @Input() set idInput(value: string) {
    this.id.set(value);
  }
  isFullWidth = signal<boolean>(false);
  @Input() set isFullWidthInput(value: boolean) {
    this.isFullWidth.set(value);
  }

  formControl = signal<FormControl<unknown>>(new FormControl());
  @Input() set formControlInput(value: FormControl<unknown>) {
    this.formControl.set(value);
  }

  selected = signal<SegmentedControlWrapper<T>>({ label: '', value: '' as T });
  @Input() set selectedInput(value: T) {
    this.selected.set({ label: this.data().find(item => item.value === value)?.label ?? '', value });
  }

  disabled = signal<boolean>(false);
  @Input() set disabledInput(value: boolean) {
    this.disabled.set(value);
  }

  @Output() selectionChange$ = new EventEmitter<T>();

  dataTracker(index: number, item: SegmentedControlWrapper<T>) {
    return item.value;
  }

  selectionChange($: SegmentedControlWrapper<T>) {
    this.selected.set($);
    this.selectionChange$.emit($.value);
  }
}
