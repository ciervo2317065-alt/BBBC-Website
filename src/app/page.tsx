import Link from 'next/link';
import { Calendar, HeartHandshake, Cross, ArrowRight, BookOpen, Users, Music } from 'lucide-react';
import { WEEKLY_SERVICES, CHURCH } from '@/lib/services';
import MotionFade from '@/components/MotionFade';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.55), transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,175,55,0.30), transparent 50%)',
          }}
        />
        <div className="relative container-page py-24 lg:py-32 text-center text-white">
          <MotionFade>
            <p className="eyebrow text-gold-300 mb-3">Welcome to</p>
            <h1 className="text-white">{CHURCH.name}</h1>
            <p className="mt-5 text-lg lg:text-xl text-white/85 max-w-2xl mx-auto italic font-serif">
              “{CHURCH.tagline}”
            </p>
          </MotionFade>
          <MotionFade delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/worship" className="btn-gold">Join Our Worship Service</Link>
              <Link href="/events" className="btn-outline border-white text-white hover:bg-white hover:text-navy-900">
                View Church Schedule
              </Link>
              <Link href="/contact#prayer" className="btn-danger">Send Prayer Request</Link>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Welcome / mission */}
      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <MotionFade>
            <p className="eyebrow mb-2">A Warm Welcome</p>
            <h2 className="mb-4">A church family for every season of faith.</h2>
            <p className="text-ink/80 leading-relaxed">
              Whether you are a long-time believer or simply exploring faith, you are welcome here.
              {' '}{CHURCH.name} is a Bible-centered, Christ-honoring family committed to worship,
              fellowship, discipleship, and reaching our community with the love of Jesus.
            </p>
            <blockquote className="mt-6 border-l-4 border-gold-400 pl-4 italic text-navy-900">
              “For God so loved the world, that he gave his only begotten Son, that whosoever
              believeth in him should not perish, but have everlasting life.” — John 3:16
            </blockquote>
          </MotionFade>
          <MotionFade delay={0.1}>
            <div className="card border-gold-200">
              <p className="eyebrow mb-2">Our Mission &amp; Vision</p>
              <h3 className="mb-3">Glorifying God. Making disciples.</h3>
              <p className="text-sm text-ink/80 mb-4">
                To glorify God by making disciples of Jesus Christ — equipping believers, reaching
                the lost, and serving our community with the gospel.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 items-start"><Cross size={16} className="text-crimson mt-1 shrink-0" /> Christ-centered worship rooted in the Word</li>
                <li className="flex gap-2 items-start"><HeartHandshake size={16} className="text-gold-500 mt-1 shrink-0" /> Faithful fellowship and discipleship</li>
                <li className="flex gap-2 items-start"><Calendar size={16} className="text-navy-700 mt-1 shrink-0" /> Ministry to the community and the world</li>
              </ul>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Weekly services */}
      <section className="bg-navy-50/60 border-y border-navy-100 py-16">
        <div className="container-page">
          <MotionFade>
            <div className="text-center">
              <p className="eyebrow">Weekly Services</p>
              <h2 className="mt-1">Join us in worship and the Word.</h2>
            </div>
          </MotionFade>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WEEKLY_SERVICES.map((s, i) => (
              <MotionFade key={`${s.day}-${s.name}`} delay={i * 0.05}>
                <div className="card card-hover text-center h-full">
                  <div className="badge bg-navy-900 text-white mb-3">{s.day}</div>
                  <div className="font-serif text-lg text-navy-900">{s.name}</div>
                  <div className="mt-2 text-sm text-gold-600 font-medium">{s.time}</div>
                </div>
              </MotionFade>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/worship" className="btn-primary">
              See Full Schedule <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="container-page py-16">
        <div className="grid md:grid-cols-3 gap-5">
          <Link href="/about" className="card card-hover">
            <Users className="text-gold-500" />
            <h3 className="mt-3">About Our Church</h3>
            <p className="text-sm text-ink/70 mt-2">History, beliefs, and the leaders who serve our family.</p>
          </Link>
          <Link href="/ministries" className="card card-hover">
            <BookOpen className="text-gold-500" />
            <h3 className="mt-3">Ministries &amp; Programs</h3>
            <p className="text-sm text-ink/70 mt-2">Serve, grow, and find your place in the body of Christ.</p>
          </Link>
          <Link href="/songs" className="card card-hover">
            <Music className="text-gold-500" />
            <h3 className="mt-3">Songs &amp; Choir Videos</h3>
            <p className="text-sm text-ink/70 mt-2">Hymns, choir specials, and recorded worship.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
