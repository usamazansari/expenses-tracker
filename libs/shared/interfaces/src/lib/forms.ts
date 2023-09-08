import { FormControl } from '@angular/forms';

type FormGroupTypeGenerator<T extends { [key: string]: unknown }> = {
  [K in keyof T]: FormControl<T[K]>;
};

/**
 * @deprecated Use FormGroups as implemented in `transaction-add.component.ts`
 */
type FormControlExtras<T extends { [key: string]: unknown }, K extends keyof T> = {
  name: K;
  value: T[K];
  error: {
    flag: boolean;
    message: string;
  };
};
export { FormControlExtras, FormGroupTypeGenerator };
