import type { CSSProperties } from 'react';
import type { Project } from '../types';

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
};

export default function ProjectCard({ project, isActive, onSelect }: ProjectCardProps) {
  const cardStyle = { '--accent': project.accent ?? '#8ec5ff' } as CSSProperties;

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 ${
        isActive
          ? 'border-white/20 bg-white/10 ring-1 ring-white/10'
          : 'border-white/10 bg-slate-950/75'
      }`}
      style={cardStyle}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isActive}
    >
      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        <span>{project.year}</span>
        {project.featured ? (
          <span className="rounded-full border border-sky-300/20 bg-sky-400/10 px-2.5 py-1 text-sky-100">Featured</span>
        ) : null}
      </div>

      <div
        className="mt-5 h-1.5 w-full rounded-full bg-[var(--accent)]/60 shadow-[0_0_24px_var(--accent)]"
        aria-hidden="true"
      />

      <h3 className="mt-5 [font-family:var(--font-display)] text-2xl font-bold tracking-tight text-white">{project.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} stack`}>
        {project.stack.map((item) => (
          <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.previewUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:-translate-y-0.5 hover:bg-slate-100"
        >
          Open preview
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white/10"
        >
          GitHub repo
        </a>
      </div>
    </article>
  );
}
