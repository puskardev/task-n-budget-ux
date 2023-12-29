import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  EditExpenseComponent,
  openEditCourseDialog,
} from '../edit-expense/edit-expense.component';
import { Expense, emptyExpense } from '../model/expense';
import { MOCK_EXPENSE_DATA } from '../model/expense-mock';
import { filter } from 'rxjs';
import { DateService } from '../service/date.service';
import { PayType } from '../enum/expense-enum';
import _ from 'lodash';
import moment from 'moment';
import { ExpenseCategoryType } from '../enum/category-type';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrl: './expense-category.component.scss',
})
export class ExpenseCategoryComponent implements OnInit {
  @Input()
  categoryType: ExpenseCategoryType = ExpenseCategoryType.Misc;

  expenseData: Expense[] = MOCK_EXPENSE_DATA;

  paytypes = PayType;

  constructor(private dialog: MatDialog, private dateService: DateService) {}

  ngOnInit() {}

  editExpense(data: Expense) {
    openEditCourseDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        if (val) {
          console.log(val);
          this.expenseData = this.expenseData.map((item: Expense) => {
            if (item.expenseId === val.expenseId) {
              return this.updatedExpense(val);
            }
            return item;
          });
        }
      });
  }

  updatedExpense(data: any): Expense {
    const expense: Expense = {
      expenseId: data.expenseId,
      name: data.name,
      amount: data.amount,
      dueDate: this.dateService.formatDate(data.dueDate),
      paymentSource: data.paymentSource,
      paymentAmount: data.paymentAmount,
      paymentDate: this.dateService.formatDate(data.paymentDate),
      note: data.note,
      payType: data.payType,
      balanceType: data.balanceType,
      expenseCategoryType: this.categoryType,
    };

    return expense;
  }

  addExpense() {
    const data: Expense = emptyExpense;
    data.expenseCategoryType = this.categoryType;

    openEditCourseDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        //make API call to presisti - will return the expense ID as well.
        // update expensesData
        const expense: Expense = this.updatedExpense(res);

        this.expenseData.push(expense);
      });
  }

  deleteExpense(data: Expense) {
    this.expenseData = this.expenseData.filter(
      (item: Expense) => item.expenseId !== data.expenseId
    );
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
}
