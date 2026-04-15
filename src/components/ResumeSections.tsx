import type { Profile } from '../types';

type ResumeSectionsProps = {
  profile: Profile;
};

export default function ResumeSections({ profile }: ResumeSectionsProps) {
  return (
    <section
      id="resume"
      className="reveal-on-scroll rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
      aria-labelledby="resume-heading"
    >
      <div className="mb-6 flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Resume</p>
        <h2
          id="resume-heading"
          className="max-w-2xl [font-family:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Experience, education, and contact.
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
          <h3 className="[font-family:var(--font-display)] text-xl font-semibold text-white">Experience</h3>
          <ul className="mt-4 space-y-4" aria-label="Experience">
            {profile.experience.map((item) => (
              <li key={`${item.title}-${item.period}`} className="space-y-2 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                <p className="text-base font-semibold text-white">{item.title}</p>
                <p className="text-sm text-slate-400">
                  {item.organization} / {item.period}
                </p>
                <p className="text-sm leading-7 text-slate-300">{item.summary}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
          <h3 className="[font-family:var(--font-display)] text-xl font-semibold text-white">Education</h3>
          <ul className="mt-4 space-y-4" aria-label="Education">
            {profile.education.map((item) => (
              <li key={`${item.program}-${item.period}`} className="space-y-2 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                <p className="text-base font-semibold text-white">{item.program}</p>
                <p className="text-sm text-slate-400">
                  {item.institution} / {item.period}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-orange-300/10 to-white/5 p-5 shadow-lg shadow-black/10">
          <h3 className="[font-family:var(--font-display)] text-xl font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-4" aria-label="Contact links">
            {profile.contacts.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                <span className="text-sm font-medium text-slate-300">{item.label}</span>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-sky-200">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
