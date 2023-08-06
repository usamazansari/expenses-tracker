import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'firebase/auth';

import { RouterModule } from '@angular/router';
import { ExtractInitialsPipe } from '../../pipes';
import { ProfileEditService } from './profile-edit.service';

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ExtractInitialsPipe],
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
  user = signal<User | null>(null);
  #service = inject(ProfileEditService);

  ngOnInit() {
    this.#service.watchUser$().subscribe(user => {
      this.user.set(user);
    });
  }

  gotoEditProperty(property: 'displayName' | 'password') {
    this.#service.gotoEditProperty(property);
  }

  editProfile() {
    throw new Error('Method not implemented.');
  }
}
