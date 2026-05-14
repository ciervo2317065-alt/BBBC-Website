import PageHero from '@/components/PageHero';
import { prisma } from '@/lib/prisma';
import { BookOpen, Cross, HeartHandshake, Users, HandHelping, Globe } from 'lucide-react';

export const dynamic = 'force-dynamic';

const BELIEFS = [
  { title: 'The Bible as the Word of God', icon: BookOpen, body: 'The Scriptures are inspired, inerrant, and the final authority for faith and life.' },
  { title: 'Salvation through Jesus Christ', icon: Cross, body: 'Salvation is by grace through faith in the death and resurrection of Christ alone.' },
  { title: 'Prayer and Worship', icon: HeartHandshake, body: 'We are called to worship God in spirit and truth and to bring every need to Him in prayer.' },
  { title: 'Evangelism and Missions', icon: Globe, body: 'We are commissioned to proclaim the gospel near and far.' },
  { title: 'Fellowship and Discipleship', icon: Users, body: 'We grow together in love, accountability, and the truth of God\'s Word.' },
  { title: 'Service to the Community', icon: HandHelping, body: 'We serve our neighbors as an expression of Christ\'s love.' },
];

export default async function AboutPage() {
  const leaders = await prisma.leader.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Church Family"
        subtitle="A people called by Christ, shaped by Scripture, and sent to love and serve."
      />

      {/* History */}
      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-1 mb-4">Church History</h2>
            <p className="text-ink/80 leading-relaxed">
              Believers Bible Baptist Church was founded with a commitment to the Word of God and
              the proclamation of the gospel of Jesus Christ. From a small beginning, the Lord has
              graciously grown a fellowship of believers devoted to worship, discipleship, and
              mission. This space will hold the church&apos;s founding year, key milestones, and
              the journey God has led us through.
            </p>
          </div>
          <div className="card border-gold-200">
            <p className="eyebrow mb-2">Mission &amp; Vision</p>
            <h3 className="mb-2">From the Cross, through the Church, to the World.</h3>
            <p className="text-sm text-ink/80">
              We exist to glorify God by making disciples of Jesus Christ — equipping believers,
              reaching the lost, and serving our community with the gospel of grace.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="bg-navy-50/60 border-y border-navy-100 py-16">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow">Core Beliefs &amp; Values</p>
            <h2 className="mt-1">What We Believe</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BELIEFS.map((b) => (
              <div key={b.title} className="card card-hover h-full">
                <b.icon className="text-gold-500" />
                <h3 className="mt-3 text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="container-page py-16">
        <div className="text-center">
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-1">Our Leadership Team</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {leaders.length === 0 && (
            <div className="card text-center col-span-full text-ink/70">
              Leadership profiles will be added soon.
            </div>
          )}
          {leaders.map((l) => (
            <div key={l.id} className="card card-hover text-center">
              <div className="mx-auto h-28 w-28 rounded-full bg-navy-50 border border-navy-100 overflow-hidden flex items-center justify-center text-navy-300">
                {l.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={l.imageUrl} alt={l.name} className="w-full h-full object-cover" />
                ) : (
                  <Users size={36} />
                )}
              </div>
              <h3 className="mt-4 text-lg">{l.name}</h3>
              <div className="text-sm text-gold-600">{l.position}</div>
              {l.bio && <p className="mt-3 text-sm text-ink/70">{l.bio}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
