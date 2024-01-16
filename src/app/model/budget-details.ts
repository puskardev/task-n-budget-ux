export interface BudgetDetails {
  totalIncome: number;
  totalExpenses: number;
  totalMiscExpenses: number;
  totalCreditCardExpenses: number;
  totalSubscriptionExpenses: number;
  totalSavings?: number;
}

export const emptyBudgetDetails: BudgetDetails = {
  totalIncome: 0,
  totalExpenses: 0,
  totalMiscExpenses: 0,
  totalCreditCardExpenses: 0,
  totalSubscriptionExpenses: 0,
  totalSavings: 0,
};
