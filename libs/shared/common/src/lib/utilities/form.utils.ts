import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControlExtras, FormGroupTypeGenerator } from '@expenses-tracker/shared/interfaces';

import { camelCaseToSentenceCase } from './string.utils';

/**
 * Get the error state of a control
 * @param control The control to check
 * @returns boolean value for the error state of the control
 */
const getError = (control: AbstractControl<unknown, unknown>): boolean => {
  return control.touched && !!control.errors;
};

/**
 * Returns the validation error message for a control
 * @param formGroup `FormGroup` to check
 * @param formControlName `FormControl` to check within the `FormGroup`
 * @returns The error message for the control as a string
 */
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

/**
 * A strongly typed helper function that accepts the `FormGroup` and the `FormControlExtras` and updates the error
 * object of the control associated with `FormControlExtras`
 * @param formGroup `FormGroup` to check
 * @param formControl `FormControl` to check within the `FormGroup`
 * @returns The error object of the `FormControlExtras`
 */
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
