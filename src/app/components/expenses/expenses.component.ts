import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseCategoryType } from '@Enums/category-type';
import { BudgetDetails } from '@Models/budget-details';
import { Expense } from '@Models/expense';
import { MOCK_EXPENSE_DATA } from '@Models/expense-mock';
import { BudgetDetailsService } from '@Services/budget-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  categoryTypes = ExpenseCategoryType;

  expenseData: Expense[] = MOCK_EXPENSE_DATA;

  totalExpense: number = this.expenseData.reduce(
    (acc, expense) => acc + (expense.amount ? expense.amount : 0),
    0
  );

  private subscription!: Subscription;

  constructor(private budgetDetailsService: BudgetDetailsService) {}

  ngOnInit(): void {
    this.subscription = this.budgetDetailsService
      .getBudgetDetails()
      .subscribe((budgetDetails) => {
        if (budgetDetails) {
          this.totalExpense = budgetDetails.totalExpenses;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
