import { BudgetDetails } from "@Models/budget-details";
import { Expense } from "@Models/expense";
import { Income } from "@Models/income";

export interface Budget {
    budgetDetails: BudgetDetails;
    expenses: Expense[];
    income: Income[];
}