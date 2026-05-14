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
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.123!2d121.0!3d14.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v0',
  socials: { facebook: '#', youtube: '#' },
};
