import PageHero from '@/components/PageHero';
import { prisma } from '@/lib/prisma';
import { Music, Video } from 'lucide-react';

export const dynamic = 'force-dynamic';

function toEmbed(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
    }
    return url;
  } catch {
    return url;
  }
}

export default async function SongsPage() {
  const [songs, videos] = await Promise.all([
    prisma.song.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.video.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Songs &amp; Choir Videos"
        title="Worship in song."
        subtitle="Hymns, choir specials, and recorded worship from our church family."
      />

      <section className="container-page py-16">
        <div className="flex items-center gap-3 mb-6">
          <Music className="text-gold-500" />
          <h2>Church Songs</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {songs.length === 0 && <div className="card text-center text-ink/70 col-span-full">Songs will appear here.</div>}
          {songs.map((s) => (
            <article key={s.id} className="card card-hover">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg">{s.title}</h3>
                  {s.author && <div className="text-xs text-gold-600">By {s.author}</div>}
                </div>
                <span className="badge bg-navy-50 text-navy-900">{s.category}</span>
              </div>
              <pre className="mt-3 whitespace-pre-wrap font-serif text-sm text-ink/80 leading-relaxed max-h-48 overflow-y-auto">
{s.lyrics}
              </pre>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-50/60 border-y border-navy-100 py-16">
        <div className="container-page">
          <div className="flex items-center gap-3 mb-6">
            <Video className="text-crimson" />
            <h2>Choir Videos</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.length === 0 && <div className="card text-center text-ink/70 col-span-full">Videos will appear here.</div>}
            {videos.map((v) => (
              <article key={v.id} className="card card-hover">
                <div className="aspect-video -mx-6 -mt-6 mb-4 bg-black overflow-hidden rounded-t-2xl">
                  <iframe
                    src={toEmbed(v.videoUrl)}
                    title={v.title}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="text-base">{v.title}</h3>
                <div className="mt-1 flex gap-2 flex-wrap text-xs text-ink/60">
                  {v.date && <span>{new Date(v.date).toLocaleDateString()}</span>}
                  {v.ministry && <span className="badge bg-gold-50 text-gold-700">{v.ministry}</span>}
                </div>
                {v.description && <p className="text-sm text-ink/70 mt-2">{v.description}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
