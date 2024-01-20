import { Budget, emptyBudget } from '@Models/budget';
import { BudgetService } from '@Services/budget/budget.service';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  panelOpenState = false;

  loadBudget: boolean = false;

  currDate: string = moment().format('MMYYYY');

  public budget: Budget = emptyBudget;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.selectedDate(this.currDate);

    this.budgetService.getBudget().subscribe({
      next: (data: Budget) => {
        this.budget = data;
        this.loadBudget = true;
      },
    });
  }

  selectedDate(date: string) {
    this.budgetService.fetchBudget(date);
  }
}
