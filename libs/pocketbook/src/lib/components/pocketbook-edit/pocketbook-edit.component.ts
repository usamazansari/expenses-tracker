import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, map, Observable, Subscription } from 'rxjs';

import { ContextService } from '@expenses-tracker/core';
import { AddPocketbookGraphicComponent } from '@expenses-tracker/shared/assets';

import { IPocketbook, POCKETBOOK_STUB } from '@expenses-tracker/shared/interfaces';
import { ComponentFlags, PocketbookEditService } from './pocketbook-edit.service';

type PocketbookEditForm = {
  name: FormControl<string | null>;
  collaboratorList: FormControl<User[] | null>;
};

@Component({
  selector: 'expenses-tracker-pocketbook-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,

    AddPocketbookGraphicComponent
  ],
  templateUrl: './pocketbook-edit.component.html'
})
export class PocketbookEditComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<PocketbookEditForm>;
  userList$!: Observable<User[]>;
  flags$!: Observable<ComponentFlags>;
  #editPocketbook$!: Subscription;
  #userList$!: Subscription;
  #pocketbook$ = new BehaviorSubject<IPocketbook>(POCKETBOOK_STUB);
  collaboratorList$!: Observable<User[]>;
  @Input() set pocketbook(value: IPocketbook) {
    this.#pocketbook$.next(value);
  }
  get pocketbook() {
    return this.#pocketbook$.getValue();
  }

  constructor(
    private _fb: FormBuilder,
    private _context: ContextService,
    private _service: PocketbookEditService
  ) {}

  ngOnInit() {
    this._service.fetchUserList$();
    this.userList$ = this._service.watchUserList$().pipe(
      map(users => users.filter(({ uid }) => uid !== this._context.getUser()?.uid)),
      filter(Boolean)
    );

    this.formGroup = this._fb.group<PocketbookEditForm>({
      name: this._fb.control<string>('', Validators.required),
      collaboratorList: this._fb.control<User[]>([])
    });

    this.#userList$ = this._service.watchUserList$().subscribe(userList => {
      const pocketbook = this._context.getPocketbook();
      this.formGroup.patchValue({
        name: pocketbook?.name,
        collaboratorList: userList.filter(({ uid }) =>
          pocketbook?.collaboratorList.includes(uid)
        )
      });
    });

    this.flags$ = this._service.watchFlags$();
  }

  removeCollaborator(collaborator: User): void {
    const selectedCollaboratorList = this.formGroup.get('collaboratorList')?.value as User[];
    const index = selectedCollaboratorList.findIndex(({ uid }) => uid === collaborator.uid);
    if (index >= 0) {
      selectedCollaboratorList.splice(index, 1);
      this.formGroup.get('collaboratorList')?.setValue(selectedCollaboratorList ?? []);
    }
  }

  editPocketbook() {
    if (!this.formGroup.invalid) {
      const { name, collaboratorList } = this.formGroup.value;
      this.#editPocketbook$ = this._service
        .editPocketbook$({
          name: name ?? '',
          collaboratorList: collaboratorList?.map(({ uid }) => uid)
        })
        .subscribe({
          next: res => {
            this.formGroup.reset();
            this._context.resetPocketbook();
            console.log({ res });
          },
          error: error => {
            console.log({ error });
          }
        });
    }
  }

  cancelEditPocketbook() {
    this.formGroup.reset();
    this._service.cancelEditPocketbook();
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
    this.#editPocketbook$?.unsubscribe();
    this.#userList$?.unsubscribe();
  }
}
