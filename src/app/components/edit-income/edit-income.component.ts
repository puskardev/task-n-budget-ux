import { Income } from '@Models/income';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import moment from 'moment';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrl: './edit-income.component.scss',
})
export class EditIncomeComponent implements OnInit {
  form = this.formBuilder.group({
    incomeId: [this.income.incomeId],
    source: [this.income.source, Validators.required],
    amount: [this.income.amount, Validators.required],
    incomeCategoryType: [this.income.incomeCategoryType],
    depositDate: [this.income.depositDate],
    depositTo: [this.income.depositTo],
    note: [this.income.note],
  });

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public income: Income,
    private dialogRef: MatDialogRef<EditIncomeComponent>
  ) {}

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}

export function openEditIncomeDialog(dialog: MatDialog, income: Income) {
  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;
  config.panelClass = 'modal-panel';
  config.backdropClass = 'backdrop-modal-panel';

  // Because the date-picker needs a Date() type.
  let deepCopyIncome = cloneDeep(income);

  deepCopyIncome.depositDate = moment(income.depositDate, 'YYYY-MM-DD').toDate();
  
  config.data = {
    ...deepCopyIncome,
  };

  const dialogRef = dialog.open(EditIncomeComponent, config);

  return dialogRef.afterClosed();
}
