import PageHero from '@/components/PageHero';
import WeeklyScheduleTable from '@/components/WeeklyScheduleTable';
import { CHURCH } from '@/lib/services';
import { MapPin, Facebook, Youtube, Radio } from 'lucide-react';

export default function WorshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Worship &amp; Services"
        title="Gather with us in the Word and worship."
        subtitle="Our regular weekly schedule — every Sunday, Wednesday, and Saturday."
      />

      <section className="container-page py-16">
        <div className="text-center mb-8">
          <p className="eyebrow">Weekly Schedule</p>
          <h2 className="mt-1">Regular Services</h2>
        </div>
        <WeeklyScheduleTable />
        <p className="text-center text-xs text-ink/60 mt-3">
          Times are subject to change — see our events calendar for special services.
        </p>
      </section>

      <section className="bg-navy-50/60 border-y border-navy-100 py-16">
        <div className="container-page grid md:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow">Find Us</p>
            <h2 className="mt-1 mb-4">Location</h2>
            <p className="flex gap-2 text-ink/80 items-start">
              <MapPin size={18} className="text-gold-500 mt-1 shrink-0" /> {CHURCH.address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${CHURCH.coords}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5"
            >
              Get Directions
            </a>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-navy-100 shadow-soft">
            <iframe
              src={CHURCH.mapsEmbedSrc}
              title="Church location map"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="text-center mb-8">
          <p className="eyebrow">Watch &amp; Listen</p>
          <h2 className="mt-1">Online Streaming</h2>
          <p className="text-sm text-ink/70 mt-2">Connect with us online — links can be updated by an admin.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          <a href={CHURCH.socials.facebook} className="card card-hover text-center">
            <Facebook className="mx-auto text-navy-900" />
            <h3 className="mt-3">Facebook Live</h3>
            <p className="text-sm text-ink/70 mt-1">Live worship and announcements.</p>
          </a>
          <a href={CHURCH.socials.youtube} className="card card-hover text-center">
            <Youtube className="mx-auto text-crimson" />
            <h3 className="mt-3">YouTube Channel</h3>
            <p className="text-sm text-ink/70 mt-1">Sermon archive and choir specials.</p>
          </a>
          <a href="/songs" className="card card-hover text-center">
            <Radio className="mx-auto text-gold-500" />
            <h3 className="mt-3">Online Sermons</h3>
            <p className="text-sm text-ink/70 mt-1">Recent messages and Bible studies.</p>
          </a>
        </div>
      </section>
    </>
  );
}
