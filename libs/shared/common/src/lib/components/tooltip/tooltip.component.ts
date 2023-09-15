import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  computed,
  signal
} from '@angular/core';

export type TooltipPosition = 'above' | 'below' | 'left' | 'right';

@Component({
  selector: 'expenses-tracker-tooltip',
  template: `
    <ng-template>
      <div class="hidden md:flex items-center max-w-xs" [ngClass]="containerClassList()">
        <div
          class="p-2 border rounded-md bg-color-canvas-overlay border-color-border-default"
          [ngClass]="contentClassList()"
          [id]="id">
          <ng-content></ng-content>
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
  attributeClassList = signal('');
  containerClassList = computed(
    () => `${this.attributeClassList()} ${['above', 'below'].includes(this.tooltipPosition) ? 'flex-col' : ''}`
  );
  contentClassList = computed(
    () =>
      `${this.attributeClassList()} ${
        ['above', 'left'].includes(this.tooltipPosition)
          ? 'order-1'
          : ['below', 'right'].includes(this.tooltipPosition)
          ? 'order-2'
          : ''
      }`
  );
  arrowClassList = computed(
    () =>
      `${this.attributeClassList()} ${
        ['below', 'right'].includes(this.tooltipPosition)
          ? 'order-1'
          : ['above', 'left'].includes(this.tooltipPosition)
          ? 'order-2'
          : ''
      } ${
        this.tooltipPosition === 'left'
          ? '-rotate-90'
          : this.tooltipPosition === 'right'
          ? 'rotate-90'
          : this.tooltipPosition === 'below'
          ? 'rotate-180'
          : ''
      }`
  );
  @Input() tooltipPosition: TooltipPosition = 'above';
  @Output() tooltipClose$ = new EventEmitter<void>();

  constructor(@Attribute('class') public _classList: string) {
    this.attributeClassList.set(_classList);
  }

  ngOnDestroy() {
    this.tooltipClose$.emit();
    this.tooltipClose$.complete();
  }
}
