import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, TemplateRef, signal } from '@angular/core';

@Component({
  selector: 'expenses-tracker-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      <div
        class="absolute p-2 border rounded-md bg-color-canvas-overlay border-color-border-default bottom-full left-0"
        [ngClass]="{ hidden: !showTooltip() }">
        <div class="tooltip-arrow absolute top-full bg-color-border-default w-5 h-5"></div>
        <!-- <div class="tooltip-content">{{ tooltipComponent }}</div> -->
        <ng-container [ngTemplateOutlet]="tooltipTemplate"></ng-container>
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

  // @HostListener('mouseenter')
  onMouseEnter(): void {
    this.showTooltip.set(true);
  }

  // TODO: improve mouseleave event to persist the card after a debounce time
  // @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showTooltip.set(false);
  }
}
