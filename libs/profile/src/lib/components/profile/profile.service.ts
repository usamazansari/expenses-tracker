import { Injectable } from '@angular/core';
import { AuthService } from '@expenses-tracker/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _authService: AuthService) {}

  getUser$() {
    return this._authService.getUser$();
  }
}
