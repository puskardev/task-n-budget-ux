import { Component } from '@angular/core';
import { ExpenseCategoryType } from '@Enums/category-type';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  panelOpenState = false;
  categoryTypes = ExpenseCategoryType;
}
