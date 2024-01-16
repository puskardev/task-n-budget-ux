import { openEditIncomeDialog } from '@Components/edit-income/edit-income.component';
import { Income, emptyIncome } from '@Models/income';
import { MOCK_INCOME_DATA } from '@Models/income-mock';
import { BudgetDetailsService } from '@Services/budget-details.service';
import { DateService } from '@Services/date.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent implements OnInit {
  panelOpenState = false;

  incomeData: Income[] = MOCK_INCOME_DATA;

  public get totalIncome(): number {
    return this.incomeData.reduce(
      (acc, income) => acc + (income.amount ? income.amount : 0),
      0
    );
  }

  constructor(
    private dialog: MatDialog,
    private dateService: DateService,
    private budgetDetailsService: BudgetDetailsService
  ) {}

  ngOnInit(): void {}

  addIncome() {
    const data: Income = emptyIncome;
    openEditIncomeDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        console.log(res);
        const expense: Income = this.updatedIncome(res);

        this.incomeData.push(expense);

        this.budgetDetailsService.updateIncomeDetails(this.totalIncome);
      });
  }

  editIncome(data: Income) {
    openEditIncomeDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        if (val) {
          console.log(val);
          this.incomeData = this.incomeData.map((item: Income) => {
            if (item.incomeId === val.incomeId) {
              return this.updatedIncome(val);
            }
            return item;
          });
          this.budgetDetailsService.updateIncomeDetails(this.totalIncome);
        }
      });
  }

  deleteIncome(data: Income) {
    this.incomeData = this.incomeData.filter(
      (item: Income) => item.incomeId !== data.incomeId
    );
    this.budgetDetailsService.updateIncomeDetails(this.totalIncome);
  }

  updatedIncome(data: any): Income {
    const expense: Income = {
      incomeId: data.incomeId,
      source: data.source,
      amount: Number(data.amount),
      incomeCategoryType: data.incomeCategoryType,
      depositDate: this.validateAndFormatDate(data.depositDate),
      depositTo: data.depositTo,
      note: data.note,
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
}
