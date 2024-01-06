import { Expense } from '@Models/expense';
import { MOCK_EXPENSE_DATA } from '@Models/expense-mock';
import { Income } from '@Models/income';
import { MOCK_INCOME_DATA } from '@Models/income-mock';
import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  @Input()
  incomeData: Income[] = MOCK_INCOME_DATA;

  @Input()
  expenseData: Expense[] = MOCK_EXPENSE_DATA;

  chartData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    const totalIncome: number = this.incomeData.reduce(
      (acc, income) => acc + (income.amount ? income.amount : 0),
      0
    );

    const totalExpense: number = this.expenseData.reduce(
      (acc, expense) => acc + (expense.amount ? expense.amount : 0),
      0
    );

    const totalSavings: number = totalIncome - totalExpense;

    this.chartData = [
      {
        name: 'Income',
        value: totalIncome,
      },
      {
        name: 'Expense',
        value: totalExpense,
      },
      {
        name: 'Savings',
        value: totalSavings,
      },
    ];

  }

  view: [number, number] = [900, 400];

  model: any = {
    name: 'Item 1',
    value: 25,
    series: 'Series A',
    min: 10,
    max: 30,
    otherProperty: 'Additional Info',
  };

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  legendTitle: string = 'Categories';

  colorScheme: Color = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal' as ScaleType,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
