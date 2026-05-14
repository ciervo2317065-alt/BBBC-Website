import PageHero from '@/components/PageHero';
import { prisma } from '@/lib/prisma';
import { HandHelping, Users } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MinistriesPage() {
  const ministries = await prisma.ministry.findMany({ orderBy: { name: 'asc' } });

  return (
    <>
      <PageHero
        eyebrow="Ministries &amp; Programs"
        title="Find your place to serve and grow."
        subtitle="Each ministry is a doorway into deeper fellowship and meaningful service."
      />

      <section className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ministries.length === 0 && (
            <div className="card text-center col-span-full text-ink/70">
              Ministries will be listed here once added.
            </div>
          )}
          {ministries.map((m) => (
            <div key={m.id} className="card card-hover h-full flex flex-col">
              <div className="h-32 -mx-6 -mt-6 mb-4 bg-gradient-to-br from-navy-100 to-gold-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                {m.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <Users className="text-navy-700" size={42} />
                )}
              </div>
              <h3 className="text-lg">{m.name}</h3>
              {m.leader && <div className="text-xs text-gold-600 mt-0.5">Led by {m.leader}</div>}
              <p className="text-sm text-ink/70 mt-2 flex-1">{m.description}</p>
              <Link href="/contact" className="btn-outline mt-4 self-start">Join This Ministry</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-50/60 border-y border-navy-100 py-16">
        <div className="container-page grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="eyebrow">Volunteer Opportunities</p>
            <h2 className="mt-1 mb-4">Serve with us.</h2>
            <p className="text-ink/80 leading-relaxed">
              We believe every member is a minister. If God has placed a desire in your heart to
              serve — whether in worship, hospitality, children&apos;s ministry, or community
              outreach — we would love to hear from you.
            </p>
          </div>
          <div className="card border-gold-200 text-center">
            <HandHelping className="mx-auto text-gold-500" />
            <h3 className="mt-3">Express interest</h3>
            <p className="text-sm text-ink/70 mt-2 mb-4">
              Reach out and one of our ministry leaders will follow up with you.
            </p>
            <Link href="/contact" className="btn-gold">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
