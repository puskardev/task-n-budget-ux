import { EventColor } from 'calendar-utils';

export const EventColors: Map<string, EventColor> = new Map([
  [
    'default',
    {
      primary: '#1e90ff',
      secondary: '#d1e8ff',
      secondaryText: '#1e90ff',
    },
  ],
  [
    'red',
    {
      primary: '#ad2121',
      secondary: '#FAE3E3',
      secondaryText: 'red',
    },
  ],
  [
    'blue',
    {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
      secondaryText: 'blue',
    },
  ],
  [
    'yellow',
    {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
      secondaryText: 'yellow',
    },
  ],
]);
