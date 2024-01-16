import {
  EditExpenseComponent,
  openEditExpenseDialog,
} from '@Components/edit-expense/edit-expense.component';
import { ExpenseCategoryType } from '@Enums/category-type';
import { PayType } from '@Enums/expense-enum';
import { Expense, emptyExpense } from '@Models/expense';
import { BudgetDetailsService } from '@Services/budget-details.service';
import { DateService } from '@Services/date.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrl: './expense-category.component.scss',
})
export class ExpenseCategoryComponent implements OnInit {
  @Input()
  categoryType!: ExpenseCategoryType;

  @Input()
  expenseData!: Expense[];

  categoryExpenseData: Expense[] = [];

  public get totalExpense(): number {
    return this.categoryExpenseData.reduce(
      (acc, expense) => acc + (expense.amount ? expense.amount : 0),
      0
    );
  }

  panelOpenState = false;

  paytypes = PayType;

  constructor(
    private dialog: MatDialog,
    private dateService: DateService,
    private budgetDetailsService: BudgetDetailsService
  ) {}

  ngOnInit() {
    this.categoryExpenseData = this.expenseData.filter(
      (item) => item.expenseCategoryType === this.categoryType
    );
  }

  editExpense(data: Expense) {
    openEditExpenseDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        if (val) {
          console.log(val);

          this.categoryExpenseData = this.categoryExpenseData.map((item: Expense) => {
            if (item.expenseId === val.expenseId) {
              return this.updatedExpense(val);
            }
            return item;
          });

          this.updateExpenseDetails();
        }
      });
  }

  updatedExpense(data: any): Expense {
    const expense: Expense = {
      expenseId: data.expenseId,
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

  addExpense() {
    const data: Expense = emptyExpense;
    data.expenseCategoryType = this.categoryType;

    openEditExpenseDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        //make API call to presisti - will return the expense ID as well.
        // update expensesData
        console.log(res);
        const expense: Expense = this.updatedExpense(res);

        this.categoryExpenseData.push(expense);

        this.updateExpenseDetails();
      });
  }
  updateExpenseDetails() {
    this.budgetDetailsService.updateExpenseDetails(
      this.categoryType,
      this.totalExpense
    );
  }

  deleteExpense(data: Expense) {
    this.categoryExpenseData = this.expenseData.filter(
      (item: Expense) => item.expenseId !== data.expenseId
    );

    this.updateExpenseDetails();
  }

  saveExpense(expense: Expense) {}

  openDialog(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(EditExpenseComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Sav clicked');
      }
      console.log(`Dialog result: ${result}`);
    });
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
