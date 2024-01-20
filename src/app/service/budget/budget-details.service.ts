import { ExpenseCategoryType } from '@Enums/category-type';
import { BudgetDetails, emptyBudgetDetails } from '@Models/budget-details';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetDetailsService {
  private budgetDetailsSubject = new BehaviorSubject<BudgetDetails | null>(
    null
  );

  getBudgetDetails() {
    return this.budgetDetailsSubject.asObservable();
  }

  constructor() {}

  updateExpenseDetails(
    expenseCategoryType: ExpenseCategoryType,
    amount: number
  ) {
    const budgetDetails =
      this.budgetDetailsSubject.getValue() != null
        ? this.budgetDetailsSubject.getValue()
        : emptyBudgetDetails;
        
    if (budgetDetails !== null) {
      switch (expenseCategoryType) {
        case ExpenseCategoryType.Misc:
          budgetDetails.totalExpenses =
            budgetDetails.totalExpenses -
            budgetDetails.totalMiscExpenses +
            amount;
          budgetDetails.totalMiscExpenses = amount;
          budgetDetails.totalSavings =
            budgetDetails.totalIncome - budgetDetails.totalExpenses;
          break;
        case ExpenseCategoryType.CreditCards:
          budgetDetails.totalExpenses =
            budgetDetails.totalExpenses -
            budgetDetails.totalCreditCardExpenses +
            amount;
          budgetDetails.totalCreditCardExpenses = amount;
          budgetDetails.totalSavings =
            budgetDetails.totalIncome - budgetDetails.totalExpenses;
          break;
        case ExpenseCategoryType.Subscriptions:
          budgetDetails.totalExpenses =
            budgetDetails.totalExpenses -
            budgetDetails.totalSubscriptionExpenses +
            amount;
          budgetDetails.totalSubscriptionExpenses = amount;
          budgetDetails.totalSavings =
            budgetDetails.totalIncome - budgetDetails.totalExpenses;
          break;
        default:
          break;
      }
      this.budgetDetailsSubject.next(budgetDetails);
    }
  }

  updateIncomeDetails(amount: number) {
    const budgetDetails = this.budgetDetailsSubject.getValue();
    if (budgetDetails !== null) {
      budgetDetails.totalIncome = amount;
      this.budgetDetailsSubject.next(budgetDetails);
    }
  }
}
