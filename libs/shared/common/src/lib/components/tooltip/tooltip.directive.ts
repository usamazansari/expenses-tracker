import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewContainerRef,
  inject,
  signal
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

import { TooltipComponent } from './tooltip.component';

let id = 0;

@Directive({
  selector: '[expensesTrackerTooltip]'
})
export class TooltipDirective implements OnInit, AfterViewInit {
  #overlayRef = signal<OverlayRef | null>(null);
  #portal = signal<TemplatePortal<unknown> | null>(null);
  #id = `expensesTrackerTooltip-${id++}`;
  #tooltipOpenFlag = new Subject<boolean>();

  @Input('expensesTrackerTooltip') tooltip!: TooltipComponent | null;

  #overlay = inject(Overlay);
  #elementRef = inject(ElementRef);
  #viewContainerRef = inject(ViewContainerRef);

  @HostListener('mouseenter', ['$event'])
  showTooltip(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.#tooltipOpenFlag.next(true);
  }

  @HostListener('mouseleave', ['$event'])
  hideTooltip(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.#tooltipOpenFlag.next(false);
  }

  ngOnInit() {
    this.#tooltipOpenFlag.pipe(debounceTime(250)).subscribe(flag => {
      if (!flag) this.#closeTooltip();
      else this.#openTooltip();
    });
  }

  ngAfterViewInit() {
    if (this.tooltip) {
      this.tooltip.id = this.#id;
      this.tooltip.tooltipClose$.subscribe(() => {
        this.#closeTooltip();
      });
    }
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

  #computePosition(): ConnectedPosition {
    switch (this.tooltip?.tooltipPosition) {
      case 'above':
      default:
        return {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: 10
        };
      case 'below':
        return {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: -10
        };
      case 'left':
        return {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center'
        };
      case 'right':
        return {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center'
        };
    }
  }

  #createOverlay() {
    if (!this.#overlayRef() && this.tooltip) {
      this.#portal.set(new TemplatePortal(this.tooltip?.tooltipTemplate, this.#viewContainerRef));
      const overlayState = new OverlayConfig({
        positionStrategy: this.#overlay
          .position()
          .flexibleConnectedTo(this.#elementRef)
          .withPositions([this.#computePosition()]),
        scrollStrategy: this.#overlay.scrollStrategies.reposition()
      });
      this.#overlayRef.set(this.#overlay.create(overlayState));
    }
  }
}
