import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'expenses-tracker-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent {}
