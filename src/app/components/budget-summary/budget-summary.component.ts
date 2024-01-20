import { BudgetDetails, emptyBudgetDetails } from '@Models/budget-details';
import { PIE_CHART_MOCK } from '@Models/pie-chart-mock';
import { BudgetService } from '@Services/budget/budget.service';
import { StatusAlertService } from '@Services/status-alert/status-alert.service';
import { Component, OnInit } from '@angular/core';
import { BudgetDetailsService } from '@Services/budget/budget-details.service';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrl: './budget-summary.component.scss',
})
export class BudgetSummaryComponent implements OnInit {
  // ngx-pie-chart options
  view: [number, number] = [900, 400];
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;
  legendTitle: string = 'Categories';

  colorScheme: Color = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal' as ScaleType,
    domain: ['#003366', '#FF6B6B', '#C3B1E1', '#4C9A2A'],
  };

  pieChartData: any[] = [];

  budgetDetails: BudgetDetails = emptyBudgetDetails;

  constructor(
    private budgetService: BudgetService,
    private statusAlertService: StatusAlertService
  ) {}

  ngOnInit(): void {
    this.budgetService.getBudgetDetails().subscribe({
      next: (data: BudgetDetails) => {
        this.budgetDetails = data;
        this.pieChartData = this.getPieChartData(data);
      },
      error: (error) => {
        this.statusAlertService.openAlert(
          'Failed to load budget summary',
          'Close'
        );
        console.log(error);
      },
    });
  }

  getPieChartData(budgetDetails: BudgetDetails) {
    return [
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
