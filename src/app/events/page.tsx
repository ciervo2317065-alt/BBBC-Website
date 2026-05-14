import PageHero from '@/components/PageHero';
import EventCalendar from '@/components/EventCalendar';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const rows = await prisma.event.findMany({
    orderBy: { startsAt: 'asc' },
    include: { ministry: { select: { name: true } } },
  });
  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    startsAt: e.startsAt.toISOString(),
    endsAt: e.endsAt ? e.endsAt.toISOString() : null,
    location: e.location,
    category: e.category,
    imageUrl: e.imageUrl,
    ministry: e.ministry,
  }));

  return (
    <>
      <PageHero
        eyebrow="Events Calendar"
        title="What&rsquo;s happening at our church."
        subtitle="Weekly services, special events, retreats, and outreach programs — all in one place."
      />
      <section className="container-page py-12">
        <EventCalendar events={events} />
      </section>
    </>
  );
}
