import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AboutComponent } from '@Components/about/about.component';
import { BudgetComponent } from '@Components/budget/budget.component';
import { EditExpenseComponent } from '@Components/edit-expense/edit-expense.component';
import { ExpenseCategoryComponent } from '@Components/expense-category/expense-category.component';
import { ExpensesComponent } from '@Components/expenses/expenses.component';
import { HomeComponent } from '@Components/home/home.component';
import { TasksComponent } from '@Components/tasks/tasks.component';
import { AuthInterceptorService } from '@Services/auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxColorsModule } from 'ngx-colors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BudgetSummaryComponent } from './components/budget-summary/budget-summary.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EditIncomeComponent } from './components/edit-income/edit-income.component';
import { IncomeComponent } from './components/income/income.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MonthYearPickerComponent } from './components/month-year-picker/month-year-picker.component';
import { RegisterComponent } from './components/register/register.component';

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
    MonthYearPickerComponent,
    CalendarComponent,
    EditEventComponent,
    IncomeComponent,
    BudgetSummaryComponent,
    EditIncomeComponent,
    LoginComponent,
    MenuComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDividerModule,
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    MatButtonToggleModule,
    FlatpickrModule.forRoot(),
    NgxColorsModule,
    NgxChartsModule,
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
