import { API_ENDPOINTS } from '@Constants/api-endpoints';
import { ExpenseCategoryType } from '@Enums/category-type';
import { ExpenseType } from '@Enums/expense-enum';
import { Budget, emptyBudget } from '@Models/budget';
import { BudgetDetails, emptyBudgetDetails } from '@Models/budget-details';
import { Expense } from '@Models/expense';
import { Income } from '@Models/income';
import { StatusAlertService } from '@Services/status-alert/status-alert.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budgetId: number = 0;

  private budget: BehaviorSubject<Budget> = new BehaviorSubject<Budget>(
    emptyBudget
  );

  private budgetDetails: BehaviorSubject<BudgetDetails> =
    new BehaviorSubject<BudgetDetails>(emptyBudgetDetails);

  private income: BehaviorSubject<Income[]> = new BehaviorSubject<Income[]>([]);

  private expense: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>(
    []
  );

  constructor(
    private http: HttpClient,
    private statusAlertService: StatusAlertService
  ) {}

  public getBudgetId() {
    return this.budgetId;
  }

  public getBudget() {
    return this.budget.asObservable();
  }

  public getBudgetDetails() {
    return this.budgetDetails.asObservable();
  }

  public getIncomeData() {
    return this.income.asObservable();
  }

  public getExpenseData() {
    return this.expense.asObservable();
  }

  public updateBudget(budget: Budget) {
    this.budget.next(budget);
  }

  public fetchBudget(date: string) {
    this.http.get<any>(API_ENDPOINTS.budgetByDate(date)).subscribe({
      next: (data: Budget) => {
        this.budgetId = data.id;
        this.budget.next(data);
        this.budgetDetails.next(data.budgetDetails);
        this.income.next(data.income);
        this.expense.next(data.expenses);
      },
      error: (error) => {
        this.statusAlertService.openAlert('Failed to load budget', 'Close');
        console.log(error);
      },
    });
  }

  addIncome(income: Income) {
    this.http.post<Income>(API_ENDPOINTS.income, income).subscribe({
      next: (data: Income) => {
        const incomeData = [...this.income.getValue()];
        incomeData.push(data);

        //update subject.
        this.updateIncomeData(incomeData);
      },
      error: (error) => {
        this.statusAlertService.openAlert('Failed to add income', 'Close');
        console.log(error);
      },
    });
  }

  editIncome(income: Income) {
    this.http
      .put<Income>(API_ENDPOINTS.incomeById(income.incomeId), income)
      .subscribe({
        next: (data: Income) => {
          const incomeData = [...this.income.getValue()];
          const updatedIncomeData = incomeData.map((item: Income) => {
            if (item.incomeId === data.incomeId) {
              return data;
            }
            return item;
          });

          //update subject.
          this.updateIncomeData(updatedIncomeData);
        },
        error: (error) => {
          this.statusAlertService.openAlert('Failed to edit income', 'Close');
          console.log(error);
        },
      });
  }

  deleteIncome(incomeId: number) {
    this.http.delete(API_ENDPOINTS.incomeById(incomeId)).subscribe({
      next: (data) => {
        const incomeData = [
          ...this.income
            .getValue()
            .filter((item: Income) => item.incomeId !== incomeId),
        ];

        //update subject.
        this.updateIncomeData(incomeData);
      },
      error: (error) => {
        this.statusAlertService.openAlert('Failed to delete income', 'Close');
        console.log(error);
      },
    });
  }

  updateIncomeData(incomeData: Income[]) {
    // fire event to update income data subscribers.
    this.income.next(incomeData);

    // fire event to update budget details subscribers.
    this.budgetDetails.next(this.updateBudgetDetailsForIncome(incomeData));

    // fire event to update income data in budget subsribers.
    this.budget.next({
      ...this.budget.getValue(),
      income: incomeData,
    });
  }

  addExpense(expense: Expense) {
    this.http.post<Expense>(API_ENDPOINTS.expense, expense).subscribe({
      next: (data: Expense) => {
        const expenseData = [...this.expense.getValue()];
        expenseData.push(data);

        //update subject.
        this.updateExpenseData(expenseData);
      },
      error: (error) => {
        this.statusAlertService.openAlert('Failed to add expense', 'Close');
        console.log(error);
      },
    });
  }

  editExpense(expense: Expense) {
    this.http
      .put<Expense>(API_ENDPOINTS.expenseById(expense.expenseId), expense)
      .subscribe({
        next: (data: Expense) => {
          const expenseData = [...this.expense.getValue()];
          const updatedExpenseData = expenseData.map((item: Expense) => {
            if (item.expenseId === data.expenseId) {
              return data;
            }
            return item;
          });

          //update subject.
          this.updateExpenseData(updatedExpenseData);
        },
        error: (error) => {
          this.statusAlertService.openAlert('Failed to edit expense', 'Close');
          console.log(error);
        },
      });
  }

  deleteExpense(expenseId: number) {
    this.http.delete(API_ENDPOINTS.expenseById(expenseId)).subscribe({
      next: (data) => {
        const expenseData = [
          ...this.expense
            .getValue()
            .filter((item: Expense) => item.expenseId !== expenseId),
        ];

        //update subject.
        this.updateExpenseData(expenseData);
      },
      error: (error) => {
        this.statusAlertService.openAlert('Failed to delete expense', 'Close');
        console.log(error);
      },
    });
  }

  updateExpenseData(expenseData: Expense[]) {
    // fire event to update expense data subscribers
    this.expense.next(expenseData);

    // fire event to update budget details subscribers
    this.budgetDetails.next(this.updateBudgetDetailsForExpense(expenseData));

    // fire event to update expense data in budget component
    this.budget.next({
      ...this.budget.getValue(),
      expenses: expenseData,
    });
  }

  updateBudgetDetailsForIncome(incomeData: Income[]) {
    const budgetDetails: BudgetDetails = { ...this.budgetDetails.getValue() };
    budgetDetails.totalIncome = incomeData.reduce(
      (acc, income) => acc + (income.amount ? income.amount : 0),
      0
    );

    budgetDetails.totalSavings = budgetDetails.totalIncome - budgetDetails.totalExpenses;

    return budgetDetails;
  }

  updateBudgetDetailsForExpense(expenseData: Expense[]) {
    const budgetDetails: BudgetDetails = { ...this.budgetDetails.getValue() };
    budgetDetails.totalExpenses = expenseData.reduce(
      (acc, expense) => acc + (expense.amount ? expense.amount : 0),
      0
    );

    budgetDetails.totalMiscExpenses = expenseData.reduce(
      (acc, expense) =>
        acc +
        (expense.expenseCategoryType === ExpenseCategoryType.Misc &&
        expense.amount
          ? expense.amount
          : 0),
      0
    );

    budgetDetails.totalCreditCardExpenses = expenseData.reduce(
      (acc, expense) =>
        acc +
        (expense.expenseCategoryType === ExpenseCategoryType.CreditCards &&
        expense.amount
          ? expense.amount
          : 0),
      0
    );

    budgetDetails.totalSubscriptionExpenses = expenseData.reduce(
      (acc, expense) =>
        acc +
        (expense.expenseCategoryType === ExpenseCategoryType.Subscriptions &&
        expense.amount
          ? expense.amount
          : 0),
      0
    );

    budgetDetails.totalSavings = budgetDetails.totalIncome - budgetDetails.totalExpenses;

    return budgetDetails;
  }
}
