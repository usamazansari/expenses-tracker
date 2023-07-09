import { FormControl } from '@angular/forms';

type FormGroupTypeGenerator<T extends { [key: string]: unknown }> = {
  [K in keyof T]: FormControl<T[K]>;
};

type FromControlExtras<T extends { [key: string]: unknown }, K extends keyof T> = {
  name: K;
  value: T[K];
  error: {
    flag: boolean;
    message: string;
  };
};
export { FromControlExtras, FormGroupTypeGenerator };
