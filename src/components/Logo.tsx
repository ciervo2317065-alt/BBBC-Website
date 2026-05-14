type Props = { className?: string; withText?: boolean };

// Placeholder logo. Swap with the church logo asset once available.
export default function Logo({ className = '', withText = false }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="rounded-full bg-white border-2 border-navy-900 flex items-center justify-center overflow-hidden h-10 w-10">
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <circle cx="20" cy="20" r="19" fill="#FFFFFF" />
          <path d="M20 6 L28 16 H24 V22 H16 V16 H12 Z" fill="#D4AF37" stroke="#0B2545" strokeWidth="0.6" />
          <rect x="19" y="14" width="2" height="9" fill="#B22234" />
          <rect x="16" y="17" width="8" height="2" fill="#B22234" />
          <path d="M8 30 Q20 22 32 30 L32 36 H8 Z" fill="#0B2545" />
        </svg>
      </div>
      {withText && (
        <div className="leading-tight">
          <div className="text-navy-900 font-serif font-semibold">Believers Bible Baptist Church</div>
          <div className="text-xs text-navy-700/70">From the Cross, through the Church, to the World</div>
        </div>
      )}
    </div>
  );
}
