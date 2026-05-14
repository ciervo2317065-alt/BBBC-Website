import { PrismaClient, Role, EventCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@bbbc.local';
  const password = process.env.ADMIN_PASSWORD ?? 'changeme-now';
  const name = process.env.ADMIN_NAME ?? 'Church Admin';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: Role.ADMIN, name },
    create: { email, passwordHash, role: Role.ADMIN, name },
  });

  const ministries = [
    { name: 'Youth Ministry', description: 'Equipping young people to follow Christ.' },
    { name: "Children's Ministry", description: 'Teaching children the love of Jesus.' },
    { name: "Women's Ministry", description: 'Fellowship and discipleship for women.' },
    { name: "Men's Ministry", description: 'Brothers walking together in faith.' },
    { name: 'Music / Choir Ministry', description: 'Leading the church in worship through song.' },
    { name: 'Outreach Ministry', description: 'Sharing the gospel with our community.' },
    { name: 'Missions Ministry', description: 'Supporting missions at home and abroad.' },
    { name: 'Bible Study Groups', description: 'Small groups gathered around the Word.' },
    { name: 'Community Feeding Program', description: 'Serving meals to those in need.' },
    { name: 'Charity and Visitation Program', description: 'Visiting the sick, lonely, and bereaved.' },
  ];
  for (const m of ministries) {
    await prisma.ministry.upsert({
      where: { id: m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
      update: {},
      create: { id: m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), ...m },
    });
  }

  const existingEvents = await prisma.event.count();
  if (existingEvents === 0) {
    const inDays = (d: number, h = 10, m = 0) => {
      const dt = new Date();
      dt.setDate(dt.getDate() + d);
      dt.setHours(h, m, 0, 0);
      return dt;
    };
    await prisma.event.createMany({
      data: [
        { title: 'Church Anniversary Service', description: 'Celebrating God\'s faithfulness.', startsAt: inDays(20, 9), category: EventCategory.SPECIAL, location: 'Main Sanctuary' },
        { title: 'Youth Retreat', description: 'A weekend of worship, study, and fellowship.', startsAt: inDays(34, 8), category: EventCategory.SPECIAL, location: 'Retreat Center' },
        { title: 'Community Outreach Day', description: 'Serving our neighborhood.', startsAt: inDays(45, 7), category: EventCategory.ANNOUNCEMENT, location: 'Town Square' },
      ],
    });
  }

  const existingLeaders = await prisma.leader.count();
  if (existingLeaders === 0) {
    await prisma.leader.createMany({
      data: [
        { name: 'Pastor Name', position: 'Senior Pastor', bio: 'Shepherding the flock with the Word of God.', order: 1 },
        { name: 'Elder Name', position: 'Elder', bio: 'Serving alongside the pastor.', order: 2 },
        { name: 'Youth Leader Name', position: 'Youth Ministry Leader', bio: 'Discipling the next generation.', order: 3 },
        { name: "Children's Leader Name", position: "Children's Ministry Leader", bio: 'Teaching the little ones.', order: 4 },
      ],
    });
  }

  const existingSongs = await prisma.song.count();
  if (existingSongs === 0) {
    await prisma.song.createMany({
      data: [
        { title: 'Amazing Grace', author: 'John Newton', category: 'Hymn', lyrics: 'Amazing grace, how sweet the sound\nThat saved a wretch like me...' },
        { title: 'How Great Thou Art', author: 'Stuart K. Hine', category: 'Hymn', lyrics: 'O Lord my God, when I in awesome wonder...' },
      ],
    });
  }

  console.log('Seed complete. Admin:', email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
