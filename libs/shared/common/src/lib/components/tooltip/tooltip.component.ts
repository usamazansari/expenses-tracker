import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, signal } from '@angular/core';

@Component({
  selector: 'expenses-tracker-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <div class="absolute bottom-full pb-3 left-0 cursor-pointer" [ngClass]="{ hidden: !showTooltip() }">
        <div class="p-2 border rounded-md bg-color-canvas-overlay border-color-border-default ">
          <div class="tooltip-arrow absolute top-full bg-color-border-default w-5 h-5"></div>
          <ng-container [ngTemplateOutlet]="tooltipTemplate"></ng-container>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .tooltip-arrow {
        clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
      }
    `
  ]
})
export class TooltipComponent {
  @Input() tooltipTemplate!: TemplateRef<unknown>;

  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  showTooltip = signal(false);

  onMouseEnter(): void {
    this.showTooltip.set(true);
  }

  onMouseLeave(): void {
    this.showTooltip.set(false);
  }
}
