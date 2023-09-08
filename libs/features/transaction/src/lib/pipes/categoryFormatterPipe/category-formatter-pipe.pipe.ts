import { Pipe, PipeTransform } from '@angular/core';
import { TransactionCategory } from '@expenses-tracker/shared/interfaces';

@Pipe({
  name: 'categoryFormatterPipe',
  standalone: true
})
export class CategoryFormatterPipePipe implements PipeTransform {
  transform(value: TransactionCategory | string): string {
    return value.replace(/-/g, '').replace(/\b\w/g, l => l.toUpperCase());
  }
}
