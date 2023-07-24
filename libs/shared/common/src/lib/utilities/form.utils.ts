import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControlExtras, FormGroupTypeGenerator } from '@expenses-tracker/shared/interfaces';

import { camelCaseToSentenceCase } from './string.utils';

const getError = (control: AbstractControl<unknown, unknown>): boolean => {
  return control.touched && !!control.errors;
};

const getErrorMessage = <C extends { [key: string]: unknown }, F extends FormGroup<FormGroupTypeGenerator<C>>>(
  formGroup: F,
  formControlName: keyof C
) => {
  const control = camelCaseToSentenceCase(formControlName as string);
  if (formGroup['controls'][formControlName]?.hasError('email')) {
    return `Invalid ${control.toLowerCase()} address`;
  }
  if (formGroup['controls'][formControlName]?.hasError('required')) {
    return `${control} is required`;
  }
  return `Unknown validation error for ${control}`;
};

const controlStateValidator = <C extends { [key: string]: unknown }, F extends FormGroup<FormGroupTypeGenerator<C>>>(
  formGroup: F,
  formControl: FormControlExtras<C, keyof C>
) => {
  return {
    flag: getError(formGroup.controls[formControl.name]),
    message: getErrorMessage(formGroup, formControl.name)
  };
};

export { controlStateValidator };
