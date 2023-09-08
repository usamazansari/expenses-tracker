import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'firebase/auth';

@Pipe({
  name: 'extractInitials',
  standalone: true
})
export class ExtractInitialsPipe implements PipeTransform {
  transform(user: User | null): string {
    return (
      user?.displayName
        ?.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('') ??
      user?.email?.charAt(0).toUpperCase() ??
      ''
    );
  }
}
