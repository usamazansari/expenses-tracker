import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Notification, NotificationService } from './notification.service';

@Component({
  selector: 'expenses-tracker-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
  #notifications$!: Subscription;
  notifications$ = new BehaviorSubject<Notification[]>([]);
  #notifications: Notification[] = [];

  constructor(private _service: NotificationService) {}

  ngOnInit() {
    this.notifications$.subscribe(n => {
      this.#notifications = n;
    });

    this._service.getNotifications$().subscribe(n => {
      this.notifications$.next([...this.#notifications, n]);
      setTimeout(() => this.dismiss(n), 5000);
    });
  }

  dismiss({ id }: Notification) {
    this.notifications$.next([
      ...this.#notifications.filter(({ id: nId }) => nId !== id)
    ]);
  }

  ngOnDestroy() {
    this.#notifications$?.unsubscribe();
  }
}
