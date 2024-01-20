import { BudgetDetails } from '@Models/budget-details';
import { Expense } from '@Models/expense';
import { Income } from '@Models/income';

export interface Budget {
  id: number;
  budgetDate: string;
  budgetDetails: BudgetDetails;
  expenses: Expense[];
  income: Income[];
}

export const emptyBudget: Budget = {
  id: 0,
  budgetDate: '',
  budgetDetails: {
    budgetDetailsId: 0,
    budgetId: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalMiscExpenses: 0,
    totalCreditCardExpenses: 0,
    totalSubscriptionExpenses: 0,
    totalSavings: 0,
  },
  expenses: [],
  income: [],
};
