import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ResumeSections from './components/ResumeSections';
import { loadProfile } from './lib/profile';
import { loadProjects } from './lib/projects';
import type { Profile, Project } from './types';

const fallbackProfile: Profile = {
  name: 'Your Name',
  role: 'Frontend Developer',
  location: 'Your City, Your Country',
  imageUrl: '',
  imageAlt: 'Profile photo',
  about: ['Write your short professional summary in public/profile.json.'],
  skills: [],
  experience: [],
  education: [],
  contacts: []
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'about' | 'projects' | 'resume'>('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const [projectData, profileData] = await Promise.all([loadProjects(), loadProfile()]);

        if (!cancelled) {
          setProjects(projectData);
          setProfile(profileData);
        }
      } catch {
        if (!cancelled) {
          setError('Profile data could not be loaded.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [loading, error, projects.length, profile.name]);

  useEffect(() => {
    const sections = ['about', 'projects', 'resume']
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));

    if (sections.length === 0) {
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id as 'about' | 'projects' | 'resume';
          setActiveSection(id);
        }
      },
      { threshold: [0.3, 0.45, 0.6], rootMargin: '-10% 0px -55% 0px' }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      sectionObserver.disconnect();
    };
  }, [loading, error, projects.length]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100));
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const sortedProjects = useMemo(
    () => [...projects].sort((left, right) => Number(right.featured) - Number(left.featured)),
    [projects]
  );

  return (
    <main className="app-shell">
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-track__bar"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollProgress)}
          aria-label="Page scroll progress"
        />
      </div>

      <div className="ambient ambient--left" aria-hidden="true" />
      <div className="ambient ambient--right" aria-hidden="true" />

      <div className="page-shell">
        <nav className="section-nav reveal-on-scroll" aria-label="Section navigation">
          <a href="#about" className={activeSection === 'about' ? 'section-nav__link is-active' : 'section-nav__link'}>
            About
          </a>
          <a
            href="#projects"
            className={activeSection === 'projects' ? 'section-nav__link is-active' : 'section-nav__link'}
          >
            Projects
          </a>
          <a href="#resume" className={activeSection === 'resume' ? 'section-nav__link is-active' : 'section-nav__link'}>
            Resume
          </a>
        </nav>

        <Hero
          name={profile.name}
          role={profile.role}
          location={profile.location}
          imageUrl={profile.imageUrl}
          imageAlt={profile.imageAlt}
          projectCount={projects.length}
        />

        {loading ? <p className="status-line">Loading project data...</p> : null}
        {error ? <p className="status-line status-line--error">{error}</p> : null}

        {!loading && !error ? <ProjectGrid projects={sortedProjects} /> : null}

        <section
          id="about"
          className="section-block section-block--split reveal-on-scroll"
          aria-labelledby="about-heading"
        >
          <div className="section-block__header">
            <p className="eyebrow">About me</p>
            <h2 id="about-heading">A focused profile built around my work and experience.</h2>
          </div>

          <div className="about-card">
            {profile.about.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className="about-card about-card--stack">
            <p className="about-card__label">Core skills</p>
            <ul className="skill-list" aria-label="Core skills">
              {profile.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <ResumeSections profile={profile} />
      </div>
    </main>
  );
}
