import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExpenseCategoryType } from '@Enums/category-type';
import { BudgetDetails } from '@Models/budget-details';
import { BudgetService } from '@Services/budget/budget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  
  categoryTypes = ExpenseCategoryType;
 
  totalExpense: number = 0;

  private subscription!: Subscription;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.subscription = this.budgetService.getBudgetDetails().subscribe({
      next: (data: BudgetDetails) => {
        this.totalExpense = data.totalExpenses;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
