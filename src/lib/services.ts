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
  email: 'BBBC_Bacoor@gmail.com',
  phone: '+63 904 287 504',
  address: 'Niog, Bacoor, Cavite, Philippines',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=14.4591752,120.9557499&hl=en&z=18&output=embed',
  socials: {
    facebook: 'https://www.facebook.com/BBBCNiogBacoor',
    youtube: 'https://www.youtube.com/@believersbiblebaptistchurch',
  },
};
