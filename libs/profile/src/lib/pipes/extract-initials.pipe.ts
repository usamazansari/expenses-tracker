import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '@expenses-tracker/shared/interfaces';

@Pipe({
  name: 'extractInitials',
  standalone: true
})
export class ExtractInitialsPipe implements PipeTransform {
  transform(user: IUser | null): string {
    if (!!user) {
      const { email, displayName } = user;
      if (displayName) {
        return displayName
          .split(' ')
          .map(word => word.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('');
      }
      if (email) {
        return email.charAt(0).toUpperCase();
      }
    }
    return '';
  }
}
