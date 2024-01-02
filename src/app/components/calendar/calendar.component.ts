import { EditEventComponent } from '@Components/edit-event/edit-event.component';
import { EventColors } from '@Constants/calendar-event';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventAction, EventColor } from 'calendar-utils';
import {
  addDays,
  addHours,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays,
} from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calendar.component.scss',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  highlightedRows: Set<any> = new Set(); 

  refresh = new Subject<void>();

  actions: EventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: EventColors.get('red') as EventColor,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: EventColors.get('yellow') as EventColor,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: EventColors.get('blue') as EventColor,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: EventColors.get('yellow') as EventColor,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, public dialog: MatDialog) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);

    // navigate to the event in table.
    this.highlightedRows.add(event);
    this.scrollToRow(event);
    setTimeout(() => this.removeHighlight(event), 3000);
  }

  navigateToEventsTable(event: CalendarEvent) {
    this.highlightedRows.add(event);
    this.scrollToRow(event);
    setTimeout(() => this.removeHighlight(event), 500);
  }

  addEvent(start?: Date, end?: Date): void {
    const newEvent: CalendarEvent = {
      title: 'New event',
      start: start ? start : startOfDay(new Date()),
      end: end ? end : endOfDay(new Date()),
      color: EventColors.get('default') as EventColor,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    };

    this.events = [...this.events, newEvent];

    // navigate to the new event in table.
    this.highlightedRows.add(newEvent);
    setTimeout(() => this.scrollToRow(newEvent), 0);
  }

  scrollToRow(event: CalendarEvent) {
    const idx = this.events.findIndex((ev) => ev === event);
    const element = document.getElementById('row' + idx);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  removeHighlight(event: CalendarEvent) {
    this.highlightedRows.delete(event);
  }

  onRowClick(event: CalendarEvent) {
    this.removeHighlight(event);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onTimeClicked(event: any) {
    console.log(event); // Replace with your code
    const start: Date = event.date;
    const end: Date = addHours(event.date, 1);
    this.addEvent(start, end);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditEventComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onColorChange(item: string, color: string, index: number) {
    if (!this.events[index].color) {
      this.events[index].color = EventColors.get('default') as EventColor;
    }

    switch (item) {
      case 'border':
        this.events[index].color!.primary = color;
        break;
      case 'fill':
        this.events[index].color!.secondary = color;
        break;
      case 'text':
        this.events[index].color!.secondaryText = color;
        break;
    }

    this.refresh.next();
  }
}
