import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { IUser } from '@expenses-tracker/shared/interfaces';
import { ExtractInitialsPipe } from '../../pipes';

type ProfileEditForm = {
  name: FormControl<string | null>;
};

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ExtractInitialsPipe,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-edit.component.html',
  styles: []
})
export class ProfileEditComponent implements OnInit {
  formGroup!: FormGroup<ProfileEditForm>;
  @Input() user!: IUser;
  @Output() editUserInfo$ = new EventEmitter<{ name: string | null }>();
  @Output() cancelEdits$ = new EventEmitter<void>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this._fb.group<ProfileEditForm>({
      name: this._fb.control<string>('', {
        validators: []
      })
    });
  }

  editUserInfo() {
    this.editUserInfo$.emit(this.formGroup.value as { name: string | null });
  }

  cancelEdit() {
    this.cancelEdits$.emit();
  }
}
