import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { IUser } from '@expenses-tracker/shared/interfaces';
import { ExtractInitialsPipe } from '../../pipes';

@Component({
  selector: 'expenses-tracker-profile-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule, ExtractInitialsPipe],
  templateUrl: './profile-view.component.html'
})
export class ProfileViewComponent {
  @Input() user!: IUser;
  @Output() copyUID$ = new EventEmitter<string | null>();
  @Output() logout$ = new EventEmitter<void>();

  copyUID(uid: string) {
    this.copyUID$.emit(uid);
  }

  logout() {
    this.logout$.emit();
  }
}
