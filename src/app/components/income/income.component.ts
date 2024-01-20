import { openEditIncomeDialog } from '@Components/edit-income/edit-income.component';
import { Income, emptyIncome } from '@Models/income';
import { MOCK_INCOME_DATA } from '@Models/income-mock';
import { BudgetDetailsService } from '@Services/budget/budget-details.service';
import { DateService } from '@Services/date/date.service';
import { BudgetService } from '@Services/budget/budget.service';
import { StatusAlertService } from '@Services/status-alert/status-alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Budget } from '@Models/budget';
import { BudgetDetails } from '@Models/budget-details';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent implements OnInit {
  incomeData: Income[] = [];

  panelOpenState = false;

  totalIncome: number = 0;

  constructor(
    private dialog: MatDialog,
    private dateService: DateService,
    private budgetService: BudgetService,
    private statusAlertService: StatusAlertService
  ) {}

  ngOnInit(): void {
    this.budgetService.getIncomeData().subscribe({
      next: (data: Income[]) => {
        this.incomeData = data;
      },
      error: (error) => {
        this.statusAlertService.openAlert('Failed to load income data', 'Close');
        console.log(error);
      },
    });

    this.budgetService.getBudgetDetails().subscribe({
      next: (data: BudgetDetails) => {
        this.totalIncome = data.totalIncome;
      },
    });
  }

  addIncome() {
    const data: Income = emptyIncome;
    openEditIncomeDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        const income: Income = this.getIncome(res);

        this.budgetService.addIncome(income);
      });
  }

  editIncome(data: Income) {
    openEditIncomeDialog(this.dialog, data)
      .pipe(filter((val) => !!val))
      .subscribe((val) => {
        if (val) {
          const income: Income = this.getIncome(val);

          this.budgetService.editIncome(income);
        }
      });
  }

  deleteIncome(data: Income) {
    this.budgetService.deleteIncome(data.incomeId);
  }

  getIncome(data: any): Income {
    const expense: Income = {
      incomeId: data.incomeId,
      budgetId: this.budgetService.getBudgetId(),
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
