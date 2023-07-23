import { Attribute, Component, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'expenses-tracker-tooltip',
  template: `
    <ng-template>
      <div class="flex flex-col items-center max-w-xs" [ngClass]="classList()">
        <div class="p-2 border rounded-md bg-color-canvas-overlay border-color-border-default">
          <span [id]="id">
            <ng-content></ng-content>
          </span>
        </div>
        <div class="tooltip-arrow bg-color-border-default w-5 h-5"></div>
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
  classList = signal('');
  @Output() tooltipClose$ = new EventEmitter<void>();

  constructor(@Attribute('class') public _classList: string) {
    this.classList.set(_classList);
  }

  ngOnDestroy() {
    this.tooltipClose$.emit();
    this.tooltipClose$.complete();
  }
}
