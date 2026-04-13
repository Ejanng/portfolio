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
    <section id="projects" className="section-block reveal-on-scroll" aria-labelledby="projects-heading">
      <div className="section-block__header">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-heading">A selection of the work I have made.</h2>
      </div>

      <div className="project-grid">
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
