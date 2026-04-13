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
      className={`project-card${isActive ? ' project-card--active' : ''}`}
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
      <div className="project-card__topline">
        <span>{project.year}</span>
        {project.featured ? <span className="project-card__badge">Featured</span> : null}
      </div>

      <div className="project-card__swatch" aria-hidden="true" />

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <ul className="project-card__tags" aria-label={`${project.name} stack`}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="project-card__links">
        <a href={project.previewUrl} target="_blank" rel="noreferrer">
          Open preview
        </a>
        <a href={project.repoUrl} target="_blank" rel="noreferrer">
          GitHub repo
        </a>
      </div>
    </article>
  );
}
