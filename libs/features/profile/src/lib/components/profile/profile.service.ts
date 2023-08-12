import { Injectable, inject } from '@angular/core';
import { User } from 'firebase/auth';

import { AuthService } from '@expenses-tracker/core';
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

  updateUserInfo$(user: User) {
    return this.#auth.updateUserInfo$(user);
  }
}
