import { z } from 'zod';

const optStr = (max: number) => z.string().max(max).optional().or(z.literal(''));
const optUrl = z.string().url().optional().or(z.literal(''));

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(120),
  phone: optStr(40),
  subject: z.string().min(2).max(150),
  message: z.string().min(5).max(2000),
  // Honeypot — must be empty
  hp_field: z.string().max(0).optional(),
});

export const prayerSchema = z.object({
  name: z.string().min(2).max(100),
  contact: optStr(120),
  category: z.string().min(1).max(60),
  message: z.string().min(5).max(2000),
  isPrivate: z.boolean().default(false),
  hp_field: z.string().max(0).optional(),
});

export const eventSchema = z.object({
  title: z.string().min(2).max(150),
  description: optStr(2000),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().nullable().optional(),
  location: optStr(200),
  category: z.enum(['SERVICE', 'SPECIAL', 'ANNOUNCEMENT', 'MEETING']),
  imageUrl: optUrl,
  ministryId: z.string().nullable().optional().or(z.literal('')),
});

export const ministrySchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(2).max(2000),
  leader: optStr(120),
  imageUrl: optUrl,
});

export const leaderSchema = z.object({
  name: z.string().min(2).max(120),
  position: z.string().min(2).max(120),
  bio: optStr(2000),
  imageUrl: optUrl,
  order: z.coerce.number().int().min(0).default(0),
});

export const songSchema = z.object({
  title: z.string().min(2).max(200),
  lyrics: z.string().min(2).max(20000),
  author: optStr(150),
  category: z.string().min(2).max(60),
});

export const videoSchema = z.object({
  title: z.string().min(2).max(200),
  description: optStr(2000),
  videoUrl: z.string().url(),
  thumbnail: optUrl,
  date: z.coerce.date().nullable().optional(),
  ministry: optStr(120),
});

export const announcementSchema = z.object({
  title: z.string().min(2).max(200),
  body: z.string().min(2).max(5000),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().nullable().optional(),
  pinned: z.boolean().default(false),
});
