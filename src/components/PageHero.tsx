type Props = { eyebrow?: string; title: string; subtitle?: string };

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-navy-100">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(212,175,55,0.5), transparent 50%), radial-gradient(circle at 80% 70%, rgba(212,175,55,0.25), transparent 50%)',
        }}
      />
      <div className="relative container-page py-16 lg:py-24 text-center text-white">
        {eyebrow && <p className="eyebrow text-gold-300 mb-2">{eyebrow}</p>}
        <h1 className="text-white">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-white/85 max-w-2xl mx-auto text-base lg:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
