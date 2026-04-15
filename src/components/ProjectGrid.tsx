import { useEffect, useState } from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  useEffect(() => {
    if (projects.length === 0) {
      setSelectedProjectId('');
      return;
    }

    setSelectedProjectId((current) => {
      if (current && projects.some((project) => project.id === current)) {
        return current;
      }

      const featured = projects.find((project) => project.featured);
      return featured?.id ?? projects[0].id;
    });
  }, [projects]);

  return (
    <section
      id="projects"
      className="reveal-on-scroll rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
      aria-labelledby="projects-heading"
    >
      <div className="mb-6 flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Projects</p>
        <h2
          id="projects-heading"
          className="max-w-2xl [font-family:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          A selection of the work I have made.
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={selectedProjectId === project.id}
            onSelect={() => setSelectedProjectId(project.id)}
          />
        ))}
      </div>
    </section>
  );
}
