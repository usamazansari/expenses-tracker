import { Component, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'expenses-tracker-tooltip',
  template: `
    <ng-template>
      <div class="p-2 border rounded-md bg-color-canvas-overlay border-color-border-default">
        <span [id]="id">
          <ng-content></ng-content>
        </span>
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
  @Output() tooltipClose$ = new EventEmitter<void>();

  ngOnDestroy() {
    this.tooltipClose$.emit();
    this.tooltipClose$.complete();
  }
}
