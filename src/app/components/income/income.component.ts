
import { Income } from '@Models/income';
import { MOCK_INCOME_DATA } from '@Models/income-mock';
import { Component } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  panelOpenState = false;

  incomeData: Income[] = MOCK_INCOME_DATA;
}
