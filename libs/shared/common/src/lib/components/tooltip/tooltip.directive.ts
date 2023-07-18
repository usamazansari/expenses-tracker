import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef,
  inject,
  signal
} from '@angular/core';
import { EventManager } from '@angular/platform-browser';

import { TooltipComponent } from './tooltip.component';

let id = 0;

@Directive({
  selector: '[expensesTrackerTooltip]'
})
export class TooltipDirective implements AfterViewInit {
  #overlayRef = signal<OverlayRef | null>(null);
  #portal = signal<TemplatePortal<unknown> | null>(null);
  #id = `expensesTrackerTooltip-${id++}`;

  @Input('expensesTrackerTooltip') tooltip!: TooltipComponent;

  #overlay = inject(Overlay);
  #elementRef = inject(ElementRef);
  #viewContainerRef = inject(ViewContainerRef);
  #eventManager = inject(EventManager);

  @HostListener('mouseenter')
  showTooltip() {
    this.#openTooltip();
  }

  @HostListener('mouseleave')
  hideTooltip() {
    this.#closeTooltip();
  }

  ngAfterViewInit() {
    this.tooltip.id = this.#id;
    this.tooltip.tooltipClose$.subscribe(() => {
      this.#closeTooltip();
    });
  }

  #openTooltip(): void {
    if (!this.#overlayRef()) {
      this.#createOverlay();
    }
    if (!this.#overlayRef()?.hasAttached()) {
      this.#overlayRef()?.attach(this.#portal());
    }
  }

  #closeTooltip(): void {
    this.#overlayRef()?.detach();
  }

  #createOverlay() {
    if (!this.#overlayRef()) {
      this.#portal.set(new TemplatePortal(this.tooltip.tooltipTemplate, this.#viewContainerRef));
      this.#overlayRef.set(this.#overlay.create());
    }
  }
}
