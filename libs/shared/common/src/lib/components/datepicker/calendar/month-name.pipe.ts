import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName',
  standalone: true
})
export class MonthNamePipe implements PipeTransform {
  transform(monthIndex: number): string {
    return new Date(1970, monthIndex, 1).toLocaleDateString('default', { month: 'long' });
  }
}
