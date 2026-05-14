import type { EventCategory } from '@prisma/client';

export const CATEGORY_COLOR: Record<EventCategory | 'SERVICE', { bg: string; text: string; dot: string; label: string }> = {
  SERVICE: { bg: 'bg-navy-50', text: 'text-navy-900', dot: 'bg-navy-700', label: 'Worship Service' },
  SPECIAL: { bg: 'bg-gold-50', text: 'text-gold-700', dot: 'bg-gold-400', label: 'Special Event' },
  ANNOUNCEMENT: { bg: 'bg-red-50', text: 'text-crimson', dot: 'bg-crimson', label: 'Announcement' },
  MEETING: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500', label: 'Meeting' },
};
