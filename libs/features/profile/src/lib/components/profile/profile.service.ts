import { Clipboard } from '@angular/cdk/clipboard';
import { Injectable, inject } from '@angular/core';
import { User } from 'firebase/auth';

import { AuthService } from '@expenses-tracker/core';
import { NotificationService } from '@expenses-tracker/shared/common';
import { IFlag } from '@expenses-tracker/shared/interfaces';

export type ComponentFlags = {
  user: IFlag;
  logout: IFlag;
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  #auth = inject(AuthService);
  #notification = inject(NotificationService);
  #clipboard = inject(Clipboard);

  updateUserInfo$(user: User) {
    return this.#auth.updateUserInfo$(user);
  }

  copyUID(uid: string | null) {
    const copyState = this.#clipboard.copy(uid ?? '');
    if (copyState) {
      this.#notification.info({
        title: 'Success!',
        description: 'UID copied to the clipboard'
      });
    } else {
      this.#notification.info({
        title: 'Fail!',
        description: 'UID cannot be copied to the clipboard'
      });
    }
  }
}
