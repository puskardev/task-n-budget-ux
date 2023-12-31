import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateMonthCalendarComponent } from './date-month-calendar.component';

describe('DateMonthCalendarComponent', () => {
  let component: DateMonthCalendarComponent;
  let fixture: ComponentFixture<DateMonthCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateMonthCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateMonthCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
