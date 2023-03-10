import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User } from 'firebase/auth';

import { ExtractInitialsPipe } from '../../pipes';

type ProfileEditForm = {
  displayName: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,

    ExtractInitialsPipe
  ],
  templateUrl: './profile-edit.component.html',
  styles: []
})
export class ProfileEditComponent implements OnInit {
  formGroup!: FormGroup<ProfileEditForm>;
  @Input() user!: User;
  @Output() editUserInfo$ = new EventEmitter<{
    uid: string;
    displayName: string;
  }>();
  @Output() cancelEdit$ = new EventEmitter<void>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this._fb.group<ProfileEditForm>({
      displayName: this._fb.control<string>(this.user.displayName ?? '', {
        validators: []
      })
    });
  }

  editUserInfo() {
    this.editUserInfo$.emit({
      uid: this.user.uid,
      ...(this.formGroup.value as { displayName: string })
    });
  }

  cancelEdit() {
    this.formGroup.reset();
    this.cancelEdit$.emit();
  }
}
