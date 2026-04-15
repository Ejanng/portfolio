type HeroProps = {
  name: string;
  role: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  projectCount: number;
};

export default function Hero({ name, role, location, imageUrl, imageAlt, projectCount }: HeroProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <header className="reveal-on-scroll grid gap-4 pt-2 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-sky-400/20 via-white/5 to-orange-300/10 shadow-lg shadow-sky-950/20"
            aria-label="Profile image"
          >
            {imageUrl ? (
              <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" />
            ) : (
              <span className="[font-family:var(--font-display)] text-3xl font-bold tracking-wide text-white/90">
                {initials || 'ME'}
              </span>
            )}
          </div>

          <div className="min-w-0 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{location}</p>
            <h1 className="max-w-3xl [font-family:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {name}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{role}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 hover:-translate-y-0.5 hover:bg-slate-100"
              >
                View projects
              </a>
              <a
                href="#resume"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white/10"
              >
                Jump to resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/15 backdrop-blur-xl">
          <span className="block text-3xl font-bold tracking-tight text-white">{projectCount.toString().padStart(2, '0')}</span>
          <span className="mt-2 block text-sm text-slate-400">Projects included</span>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/15 backdrop-blur-xl">
          <span className="block text-lg font-semibold leading-7 text-white" title={role}>
            {role}
          </span>
          <span className="mt-2 block text-sm text-slate-400">Primary role</span>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/15 backdrop-blur-xl">
          <span className="block text-lg font-semibold leading-7 text-white" title={location}>
            {location}
          </span>
          <span className="mt-2 block text-sm text-slate-400">Home town</span>
        </div>
      </div>
    </header>
  );
}
