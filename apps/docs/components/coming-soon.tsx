type ComingSoonProps = {
  description: string;
};

export function ComingSoon({ description }: ComingSoonProps) {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl border border-zinc-800/90 bg-linear-to-b from-zinc-900 via-zinc-950 to-black p-6 text-sm text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/18 to-transparent" />
      <div className="inline-flex rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur-sm">
        Coming Soon
      </div>
      <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-100">{description}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-800" />
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-500 shadow-[0_0_12px_rgba(255,255,255,0.12)]" />
      </div>
    </div>
  );
}
