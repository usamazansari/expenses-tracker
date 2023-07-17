import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from 'firebase/auth';

import { ExtractInitialsPipe } from '../../pipes';

type ProfileEditForm = {
  displayName: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExtractInitialsPipe],
  templateUrl: './profile-edit.component.html',
  styles: []
})
export class ProfileEditComponent implements OnInit {
  formGroup!: FormGroup<ProfileEditForm>;
  @Input() user!: User | null;
  @Output() updateUserInfo$ = new EventEmitter<User>();
  @Output() cancelEdit$ = new EventEmitter<void>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this._fb.group<ProfileEditForm>({
      displayName: this._fb.control<string>(this.user?.displayName ?? '', {
        validators: []
      })
    });
  }

  updateUserInfo() {
    this.updateUserInfo$.emit({
      ...(this.formGroup.value as User),
      uid: this.user?.uid
    } as User);
  }

  cancelEdit() {
    this.formGroup.reset();
    this.cancelEdit$.emit();
  }
}
