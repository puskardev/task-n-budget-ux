import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
  MomentDateModule,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@Components/home/home.component';
import { TasksComponent } from '@Components/tasks/tasks.component';
import { BudgetComponent } from '@Components/budget/budget.component';
import { AboutComponent } from '@Components/about/about.component';
import { ExpensesComponent } from '@Components/expenses/expenses.component';
import { EditExpenseComponent } from '@Components/edit-expense/edit-expense.component';
import { ExpenseCategoryComponent } from '@Components/expense-category/expense-category.component';
import { DateMonthCalendarComponent } from '@Components/date-month-calendar/date-month-calendar.component';
import { DATE_MONTH } from './constants/date-month';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    BudgetComponent,
    AboutComponent,
    ExpensesComponent,
    EditExpenseComponent,
    ExpenseCategoryComponent,
    DateMonthCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MomentDateModule,
  ],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_MONTH },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
