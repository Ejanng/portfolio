import type { Project } from '../types';

export async function loadProjects(): Promise<Project[]> {
  const response = await fetch('/projects.json');

  if (!response.ok) {
    throw new Error('Unable to load project data.');
  }

  const projects = (await response.json()) as Project[];
  return projects;
}
