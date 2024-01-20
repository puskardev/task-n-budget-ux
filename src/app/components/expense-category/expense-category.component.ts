import {
  openEditExpenseDialog
} from '@Components/edit-expense/edit-expense.component';
import { ExpenseCategoryType } from '@Enums/category-type';
import { PayType } from '@Enums/expense-enum';
import { Expense, emptyExpense } from '@Models/expense';
import { BudgetService } from '@Services/budget/budget.service';
import { DateService } from '@Services/date/date.service';
import { StatusAlertService } from '@Services/status-alert/status-alert.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrl: './expense-category.component.scss',
})
export class ExpenseCategoryComponent implements OnInit {
  @Input()
  categoryType!: ExpenseCategoryType;

  categoryExpenseData: Expense[] = [];

  categoryTotalExpense: number = 0;

  panelOpenState = false;

  paytypes = PayType;

  constructor(
    private dialog: MatDialog,
    private dateService: DateService,
    public budgetService: BudgetService,
    private statusAlertService: StatusAlertService
  ) {}

  ngOnInit() {
    this.budgetService.getExpenseData().subscribe({
      next: (data: Expense[]) => {
        this.categoryExpenseData = data.filter(
          (item: Expense) => item.expenseCategoryType === this.categoryType
        );
      },
      error: (error) => {
        this.statusAlertService.openAlert(
          'Failed to load expense data',
          'Close'
        );
        console.log(error);
      },
    });

    this.budgetService.getBudgetDetails().subscribe({
      next: (data) => {
        switch (this.categoryType) {
          case ExpenseCategoryType.Misc:
            this.categoryTotalExpense = data.totalMiscExpenses;
            break;
          case ExpenseCategoryType.CreditCards:
            this.categoryTotalExpense = data.totalCreditCardExpenses;
            break;
          case ExpenseCategoryType.Subscriptions:
            this.categoryTotalExpense = data.totalSubscriptionExpenses;
            break;
          default:
            break;
        }
      },
    });
  }

  addExpense() {
    const data: Expense = emptyExpense;
    data.expenseCategoryType = this.categoryType;

    openEditExpenseDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        const expense: Expense = this.getExpense(res);

        this.budgetService.addExpense(expense);
      });
  }

  editExpense(data: Expense) {
    openEditExpenseDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        if (val) {
          const expense: Expense = this.getExpense(val);

          this.budgetService.editExpense(expense);
        }
      });
  }

  deleteExpense(data: Expense) {
    this.budgetService.deleteExpense(data.expenseId);
  }

  getExpense(data: any): Expense {
    const expense: Expense = {
      expenseId: data.expenseId,
      budgetId: this.budgetService.getBudgetId(),
      name: data.name,
      expenseType: data.expenseType,
      amount: Number(data.amount),
      dueDate: this.validateAndFormatDate(data.dueDate),
      paymentSource: data.paymentSource,
      paymentAmount: Number(data.paymentAmount),
      paymentDate: this.validateAndFormatDate(data.paymentDate),
      note: data.note,
      payType: data.payType,
      balanceType: data.balanceType,
      expenseCategoryType: this.categoryType,
    };
    return expense;
  }

  validateAndFormatDate(date: any): string | null {
    if (date && !isNaN(new Date(date).valueOf())) {
      return this.dateService.formatDate(date);
    } else {
      return null;
    }
  }

  getCategoryClass() {
    switch (this.categoryType) {
      case ExpenseCategoryType.Misc:
        return 'misc';
      case ExpenseCategoryType.CreditCards:
        return 'credit-card';
      case ExpenseCategoryType.Subscriptions:
        return 'subscription';
      default:
        return '';
    }
  }
}
