import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import PrayerRequestForm from '@/components/PrayerRequestForm';
import { CHURCH } from '@/lib/services';
import { Mail, Phone, MapPin, Clock, Facebook, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We&rsquo;d love to hear from you."
        subtitle="Reach out with questions, prayer requests, or to learn more about our church."
      />

      <section className="container-page py-16 grid lg:grid-cols-3 gap-8">
        <div className="card border-navy-100 h-fit">
          <h3 className="mb-4">Church Information</h3>
          <ul className="space-y-3 text-sm text-ink/80">
            <li className="flex gap-2 items-start"><MapPin size={16} className="text-gold-500 mt-1 shrink-0"/> {CHURCH.address}</li>
            <li className="flex gap-2 items-start"><Phone size={16} className="text-gold-500 mt-1 shrink-0"/> {CHURCH.phone}</li>
            <li className="flex gap-2 items-start"><Mail size={16} className="text-gold-500 mt-1 shrink-0"/> {CHURCH.email}</li>
            <li className="flex gap-2 items-start"><Clock size={16} className="text-gold-500 mt-1 shrink-0"/> Office hours: Tue–Fri, 9:00 AM – 4:00 PM</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={CHURCH.socials.facebook} aria-label="Facebook" className="p-2 rounded-full border border-navy-200 hover:bg-navy-50"><Facebook size={18}/></a>
            <a href={CHURCH.socials.youtube} aria-label="YouTube" className="p-2 rounded-full border border-navy-200 hover:bg-navy-50"><Youtube size={18}/></a>
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <p className="eyebrow">Contact Form</p>
          <h3 className="mt-1 mb-4">Send us a message</h3>
          <ContactForm />
        </div>
      </section>

      <section id="prayer" className="bg-navy-50/60 border-y border-navy-100 py-16">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <p className="eyebrow">Prayer Request</p>
            <h2 className="mt-1">We are praying with you.</h2>
            <p className="text-sm text-ink/70 mt-2">
              Submissions are received privately by our pastoral team. Mark as private to keep your
              request from being shared in any setting.
            </p>
          </div>
          <div className="card">
            <PrayerRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
