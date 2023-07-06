import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { User } from 'firebase/auth';
import { Observable, Subscription, filter, map } from 'rxjs';

import { ContextService } from '@expenses-tracker/core';
import { IPocketbook } from '@expenses-tracker/shared/interfaces';

import { ComponentFlags, PocketbookAddService } from './pocketbook-add.service';

type PocketbookAddForm = {
  name: FormControl<string | null>;
  collaboratorList: FormControl<User[] | null>;
};

@Component({
  selector: 'expenses-tracker-pocketbook-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pocketbook-add.component.html',
  styles: []
})
export class PocketbookAddComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<PocketbookAddForm>;
  userList$!: Observable<User[]>;
  flags$!: Observable<ComponentFlags>;
  #addPocketbook$!: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _context: ContextService,
    private _service: PocketbookAddService
  ) {}

  ngOnInit() {
    this._service.fetchUserList$();
    this.userList$ = this._service.watchUserList$().pipe(
      map(users => users.filter(({ uid }) => uid !== this._context.getUser()?.uid)),
      filter(Boolean)
    );

    this.formGroup = this._fb.group<PocketbookAddForm>({
      name: this._fb.control<string>('', Validators.required),
      collaboratorList: this._fb.control<User[]>([])
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

  addPocketbook() {
    if (!this.formGroup.invalid) {
      const { name, collaboratorList: collaborators } = this.formGroup.value;
      this.#addPocketbook$ = this._service
        .addPocketbook$({
          name: name ?? '',
          collaboratorList: collaborators?.map(({ uid }) => uid)
        } as IPocketbook)
        .subscribe({
          next: () => {
            this.formGroup.reset();
          },
          error: error => {
            console.error({ error });
          }
        });
    }
  }

  cancelAddPocketbook() {
    this.formGroup.reset();
    this._service.cancelAddPocketbook();
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
