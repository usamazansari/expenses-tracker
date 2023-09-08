import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  #fb = inject(FormBuilder);
  #context = inject(ContextService);
  #service = inject(PocketbookAddService);
  user = computed(() => this.#context.user());

  ngOnInit() {
    this.#service.fetchUserList$();
    this.userList$ = this.#service.watchUserList$().pipe(
      map(users => users.filter(({ uid }) => uid !== this.user()?.uid)),
      filter(Boolean)
    );

    this.formGroup = this.#fb.group<PocketbookAddForm>({
      name: this.#fb.control<string>('', Validators.required),
      collaboratorList: this.#fb.control<User[]>([])
    });

    this.flags$ = this.#service.watchFlags$();
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
      this.#addPocketbook$ = this.#service
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
    this.#service.cancelAddPocketbook();
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }
    return '';
  }

  ngOnDestroy() {
    this.#addPocketbook$?.unsubscribe();
  }
}
