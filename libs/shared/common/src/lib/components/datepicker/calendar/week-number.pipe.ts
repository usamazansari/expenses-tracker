import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekNumber',
  standalone: true
})
export class WeekNumberPipe implements PipeTransform {
  transform(value: Date): unknown {
    return formatDate(value, 'ww', 'en-US');
  }
}
