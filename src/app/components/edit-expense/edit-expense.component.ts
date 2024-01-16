import { ExpenseCategoryType } from '@Enums/category-type';
import { BalanceType, ExpenseType, PayType } from '@Enums/expense-enum';
import { Expense } from '@Models/expense';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss',
})
export class EditExpenseComponent implements OnInit {
  form = this.formBuilder.group({
    expenseId: [this.expense.expenseId],
    name: [this.expense.name, Validators.required],
    amount: [this.expense.amount, Validators.required],
    dueDate: [this.expense.dueDate],
    paymentSource: [this.expense.paymentSource],
    paymentAmount: [this.expense.paymentAmount],
    paymentDate: [this.expense.paymentDate],
    payType: [this.expense.payType],
    note: [this.expense.note],
    balanceType: [this.expense.balanceType],
    expenseType: [this.expense.expenseType],
  });

  checked = false;

  dueLabel =
    this.expense.expenseType === ExpenseType.Fixed
      ? 'Due Amount'
      : 'Amount Spent';

  expenseTypes: string[] = Object.values(ExpenseType);
  payTypes: string[] = Object.values(PayType);
  balanceTypes: string[] = Object.values(BalanceType);

  categoryTypes = ExpenseCategoryType;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public expense: Expense,
    private dialogRef: MatDialogRef<EditExpenseComponent>
  ) {}

  ngOnInit() {
    this.form.get('expenseType')?.valueChanges.subscribe((value) => {
      this.dueLabel =
        value === ExpenseType.Fixed ? 'Due Amount' : 'Amount Spent';
      if (value === ExpenseType.Fixed) {
        this.form.get('dueDate')?.setValidators(Validators.required);
        this.form.get('dueDate')?.updateValueAndValidity();
      } else {
        this.form.get('dueDate')?.clearValidators();
        this.form.get('dueDate')?.reset();
        this.form.get('dueDate')?.updateValueAndValidity();
      }
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}

export function openEditExpenseDialog(dialog: MatDialog, expense: Expense) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.backdropClass = 'backdrop-modal-panel';

  // Because the date-picker needs a Date() type.
  let deepCopyExpense = cloneDeep(expense);

  deepCopyExpense.dueDate = moment(expense.dueDate, 'YYYY-MM-DD').toDate();
  deepCopyExpense.paymentDate = moment(
    expense.paymentDate,
    'YYYY-MM-DD'
  ).toDate();

  config.data = {
    ...deepCopyExpense,
  };

  const dialogRef = dialog.open(EditExpenseComponent, config);

  return dialogRef.afterClosed();
}
