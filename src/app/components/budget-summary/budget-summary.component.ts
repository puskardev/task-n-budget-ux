import { PIE_CHART_MOCK } from '@Models/pie-chart-mock';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrl: './budget-summary.component.scss',
})
export class BudgetSummaryComponent implements OnInit {
  pieChartData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.pieChartData = PIE_CHART_MOCK;
  }
}
