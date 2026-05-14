'use client';

import { useRef, useState } from 'react';
import { ImagePlus, X, Loader2 } from 'lucide-react';

type Props = {
  name: string;
  defaultValue?: string;
};

export default function ImageUpload({ name, defaultValue }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>(defaultValue ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.error === 'string' ? data.error : 'Upload failed');
      }
      const data = (await res.json()) as { url: string };
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} readOnly />
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />

      {url ? (
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Uploaded preview"
            className="h-24 w-24 object-cover rounded-lg border border-navy-200"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-xs text-navy-900 underline hover:text-navy-700"
              disabled={busy}
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => setUrl('')}
              className="text-xs text-crimson underline hover:opacity-80 inline-flex items-center gap-1"
            >
              <X size={12} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="h-24 w-24 rounded-lg border-2 border-dashed border-navy-200 hover:border-navy-700 hover:bg-navy-50 flex flex-col items-center justify-center text-navy-300 hover:text-navy-700 transition"
          aria-label="Upload image"
        >
          {busy ? <Loader2 className="animate-spin" size={20} /> : <ImagePlus size={22} />}
          <span className="text-[10px] mt-1">{busy ? 'Uploading…' : 'Add image'}</span>
        </button>
      )}

      {error && <p className="mt-2 text-xs text-crimson">{error}</p>}
    </div>
  );
}
