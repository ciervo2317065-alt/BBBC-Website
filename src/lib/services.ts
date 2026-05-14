export type WeeklyService = {
  day: 'Sunday' | 'Wednesday' | 'Saturday';
  name: string;
  time: string;
  hour: number;
  minute: number;
};

export const WEEKLY_SERVICES: WeeklyService[] = [
  { day: 'Sunday', name: 'Worship Service', time: '9:00 AM', hour: 9, minute: 0 },
  { day: 'Sunday', name: 'Sunday School', time: '10:30 AM', hour: 10, minute: 30 },
  { day: 'Wednesday', name: 'Prayer Meeting / Bible Study', time: '7:00 PM', hour: 19, minute: 0 },
  { day: 'Saturday', name: 'Youth Fellowship / Church Activity', time: '3:00 PM', hour: 15, minute: 0 },
];

export const DAY_INDEX: Record<WeeklyService['day'], number> = {
  Sunday: 0,
  Wednesday: 3,
  Saturday: 6,
};

export const CHURCH = {
  name: 'Believers Bible Baptist Church',
  shortName: 'BBBC',
  tagline: 'From the Cross, through the Church, to the World.',
  email: 'hello@bbbc.example',
  phone: '+000 000 0000',
  address: 'Church Address, City',
  // To change the map location, edit the `q=` value to a real address or place name.
  // Example: 'https://www.google.com/maps?q=123+Main+St,+Manila,+Philippines&output=embed'
  mapsEmbedSrc: 'https://www.google.com/maps?q=Manila,Philippines&output=embed',
  socials: { facebook: '#', youtube: '#' },
};
