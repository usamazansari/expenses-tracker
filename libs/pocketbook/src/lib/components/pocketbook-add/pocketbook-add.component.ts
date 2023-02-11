import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { User } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';

import { AddPocketbookGraphicComponent } from '@expenses-tracker/shared/assets';

import { PocketbookAddService } from './pocketbook-add.service';

type PocketbookAddForm = {
  name: FormControl<string | null>;
  collaborators: FormControl<string[] | null>;
};

@Component({
  selector: 'expenses-tracker-pocketbook-add',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,

    AddPocketbookGraphicComponent
  ],
  templateUrl: './pocketbook-add.component.html',
  styles: []
})
export class PocketbookAddComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<PocketbookAddForm>;
  users$!: Observable<User[]>;
  #addPocketbook$!: Subscription;

  constructor(private _fb: FormBuilder, private _service: PocketbookAddService) {}

  ngOnInit() {
    this._service.fetchUserList$();
    this.users$ = this._service.watchUserList$();
    this.formGroup = this._fb.group<PocketbookAddForm>({
      name: this._fb.control<string>('', Validators.required),
      collaborators: this._fb.control<string[]>([])
    });
  }

  addPocketbook() {
    if (!this.formGroup.invalid) {
      const { name, collaborators } = this.formGroup.value;
      this.#addPocketbook$ = this._service
        .addPocketbook$({
          name: name ?? '',
          collaborators: collaborators ?? []
        })
        .subscribe({
          next: res => {
            this.formGroup.reset();
            console.log({ res });
          },
          error: error => {
            console.log({ error });
          }
        });
    }
  }

  cancelAddPocketbook() {
    this.formGroup.reset();
    this._service.cancelAddPocketbook();
  }

  dismissError() {
    // this._service.dismissError();
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${
        formControlName.charAt(0).toUpperCase() + formControlName.slice(1)
      } is required`;
    }
    return '';
  }

  ngOnDestroy() {
    this.#addPocketbook$?.unsubscribe();
  }
}
