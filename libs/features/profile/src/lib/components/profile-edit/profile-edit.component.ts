import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'firebase/auth';

import { FormGroupTypeGenerator, FormControlExtras, INITIAL_FLAGS } from '@expenses-tracker/shared/interfaces';

import { ExtractInitialsPipe } from '../../pipes';
import { ComponentFlags, ComponentForm, ProfileEditService } from './profile-edit.service';
import { controlStateValidator } from '@expenses-tracker/shared/common';

@Component({
  selector: 'expenses-tracker-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExtractInitialsPipe],
  templateUrl: './profile-edit.component.html',
  styles: []
})
export class ProfileEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupTypeGenerator<ComponentForm>>;
  user = signal<User | null>(null);
  #fb = inject(FormBuilder);
  #service = inject(ProfileEditService);
  displayName = signal<FormControlExtras<ComponentForm, 'displayName'>>({
    name: 'displayName',
    value: '',
    error: { flag: false, message: '' }
  });
  flags = signal<ComponentFlags>({ edit: INITIAL_FLAGS });

  ngOnInit() {
    this.formGroup = this.#fb.group<FormGroupTypeGenerator<ComponentForm>>({
      displayName: this.#fb.control<string>(this.user()?.displayName ?? '', {
        validators: [Validators.required]
      }) as FormControl<string>
    });
  }

  checkControl(formControl: FormControlExtras<ComponentForm, keyof ComponentForm>) {
    const { flag, message } = controlStateValidator(this.formGroup, formControl);
    this.displayName.update(props => ({ ...props, error: { flag, message } }));
  }

  editProfile() {
    throw new Error('Method not implemented.');
  }

  cancelEdit() {
    this.formGroup.reset();
    this.#service.cancelEdit();
  }
}
