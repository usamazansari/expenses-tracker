import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
import { Observable, Subscription, filter, map } from 'rxjs';

import { ContextService } from '@expenses-tracker/core';

import { IPocketbook } from '@expenses-tracker/shared/interfaces';
import { ComponentFlags, IPocketbookEditForm, PocketbookEditService } from './pocketbook-edit.service';

type PocketbookEditForm<T extends IPocketbookEditForm = IPocketbookEditForm> = {
  name: FormControl<T['name']>;
  collaboratorList: FormControl<T['collaboratorList']>;
};

@Component({
  selector: 'expenses-tracker-pocketbook-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pocketbook-edit.component.html'
})
export class PocketbookEditComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup<PocketbookEditForm>;
  userList$!: Observable<User[]>;
  flags$!: Observable<ComponentFlags>;
  #editPocketbook$!: Subscription;
  #patchValues$!: Subscription;
  pocketbook$!: Observable<IPocketbook | null>;
  collaboratorList$!: Observable<User[]>;
  #fb = inject(FormBuilder);
  #context = inject(ContextService);
  #service = inject(PocketbookEditService);
  user = computed(() => this.#context.user());

  ngOnInit() {
    this.#service.fetchUserList$();
    this.userList$ = this.#service.watchUserList$().pipe(
      map(users => users.filter(({ uid }) => uid !== this.user()?.uid)),
      filter(Boolean)
    );

    this.formGroup = this.#fb.group<PocketbookEditForm>({
      name: this.#fb.control<string>('', Validators.required),
      collaboratorList: this.#fb.control<User[]>([])
    });

    // this.#patchValues$ = this.#service.patchValues$().subscribe(patchValues => {
    //   this.formGroup.patchValue(patchValues);
    // });

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

  editPocketbook() {
    if (!this.formGroup.invalid) {
      const { name, collaboratorList } = this.formGroup.value;
      // this.#editPocketbook$ = this.#service
      //   .editPocketbook$({
      //     name: name ?? '',
      //     collaboratorList: collaboratorList?.map(({ uid }) => uid)
      //   })
      //   .subscribe({
      //     next: () => {
      //       this.formGroup.reset();
      //       this.#context.resetPocketbook();
      //     },
      //     error: error => {
      //       console.error({ error });
      //     }
      //   });
    }
  }

  cancelEditPocketbook() {
    this.formGroup.reset();
    this.#service.cancelEditPocketbook();
  }

  getError(formControlName = '') {
    if (this.formGroup.get(formControlName)?.hasError('required')) {
      return `${formControlName.charAt(0).toUpperCase() + formControlName.slice(1)} is required`;
    }
    return '';
  }

  ngOnDestroy() {
    this.#editPocketbook$?.unsubscribe();
    this.#patchValues$?.unsubscribe();
  }
}
