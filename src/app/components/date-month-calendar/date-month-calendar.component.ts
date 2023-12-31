import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

import { Moment } from 'moment';
import moment from 'moment';

@Component({
  selector: 'app-date-month-calendar',
  templateUrl: './date-month-calendar.component.html',
  styleUrl: './date-month-calendar.component.scss',
})
export class DateMonthCalendarComponent {
  date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value ? moment(this.date.value) : moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
