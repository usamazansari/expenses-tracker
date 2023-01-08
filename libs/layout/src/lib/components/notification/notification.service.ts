import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Notification = {
  id?: number;
  type?: 'info' | 'success' | 'error';
  title: string;
  description: string;
  icon?: string;
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  #notification$ = new Subject<Notification>();
  #idx = 0;

  getNotifications$() {
    return this.#notification$.asObservable();
  }

  info(notification: Notification) {
    this.#notification$.next({
      id: this.#idx++,
      ...notification,
      type: 'info',
      icon: 'error'
    });
  }

  success(notification: Notification) {
    this.#notification$.next({
      id: this.#idx++,
      ...notification,
      type: 'success',
      icon: 'check'
    });
  }

  error(notification: Notification) {
    this.#notification$.next({
      id: this.#idx++,
      ...notification,
      type: 'error',
      icon: 'cancel'
    });
  }
}
