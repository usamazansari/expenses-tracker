import { Attribute, Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';

export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Component({
  selector: 'expenses-tracker-tooltip',
  template: `
    <ng-template>
      <div
        class="flex  items-center max-w-xs"
        [ngClass]="{ classList: true, 'flex-col': ['above', 'below'].includes(tooltipPosition) }">
        <div
          class="p-2 border rounded-md bg-color-canvas-overlay border-color-border-default"
          [ngClass]="{
            'order-1': ['above', 'left'].includes(tooltipPosition),
            'order-2': ['below', 'right'].includes(tooltipPosition)
          }">
          <span [id]="id">
            <ng-content></ng-content>
          </span>
        </div>
        <div
          class="tooltip-arrow bg-color-border-default w-5 h-5"
          [ngClass]="{
            'order-1': ['below', 'right'].includes(tooltipPosition),
            'order-2': ['above', 'left'].includes(tooltipPosition),
            '-rotate-90': tooltipPosition === 'left',
            'rotate-90': tooltipPosition === 'right',
            'rotate-180': tooltipPosition === 'below'
          }"></div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .tooltip-arrow {
        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
      }
    `
  ]
})
export class TooltipComponent implements OnDestroy {
  @ViewChild(TemplateRef) tooltipTemplate!: TemplateRef<unknown>;
  id = '';
  classList = '';
  @Input() tooltipPosition: TooltipPosition = 'above';
  @Output() tooltipClose$ = new EventEmitter<void>();

  constructor(@Attribute('class') public _classList: string) {
    this.classList = _classList;
  }

  ngOnDestroy() {
    this.tooltipClose$.emit();
    this.tooltipClose$.complete();
  }
}
