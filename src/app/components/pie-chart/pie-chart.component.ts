import { Expense } from '@Models/expense';
import { MOCK_EXPENSE_DATA } from '@Models/expense-mock';
import { Income } from '@Models/income';
import { MOCK_INCOME_DATA } from '@Models/income-mock';
import { BudgetDetailsService } from '@Services/budget-details.service';
import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  @Input()
  pieChartData: any[] = [];

  constructor(private budgetDetailsService: BudgetDetailsService) {}

  ngOnInit(): void {
    this.budgetDetailsService.getBudgetDetails().subscribe((budgetDetails) => {
      if (budgetDetails) {
        this.pieChartData = [
          {
            name: 'Misc Expenses',
            value: budgetDetails.totalMiscExpenses,
          },
          {
            name: 'Credit Cards',
            value: budgetDetails.totalCreditCardExpenses,
          },
          {
            name: 'Subscriptions',
            value: budgetDetails.totalSubscriptionExpenses,
          },
          {
            name: 'Savings',
            value: budgetDetails.totalSavings,
          },
        ];
      }
    });
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
    domain: ['#5D9C59', '#DF2E38', '#C7B42C', '#AAAAAA'],
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
